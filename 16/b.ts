const input = Deno.readTextFileSync("16/input.txt");

const lines = input.split("\r\n")

class Tunnel {
  distances: number[];
  constructor(public name: string, public flow: number, public paths: string[]) {
    this.name = name;
    this.flow = flow;
    this.paths = paths;
    this.distances = new Array(paths.length).fill(1);
  }
}

class Game {
  constructor(public valves: string, public pos1: string, public pos2: string, public pressure: number, public minutes1: number, public minutes2: number) {
    this.valves = valves;
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.pressure = pressure;
    this.minutes1 = minutes1;
    this.minutes2 = minutes2;
  }
}

const tunnels: {[name:string]: Tunnel} = {};
let valves = 0;

for(const line of lines) {
  const parts = line.split(";");
  const name = parts[0].match(/Valve (\w)+/g)![0].replace("Valve ", "");
  const flow = Number(parts[0].match(/\d+/g)![0]);
  const paths = parts[1].replace(/tunnel(s)* lead(s)* to valve(s)* /g, "").split(", ").map(x => x.trim());
  tunnels[name] = new Tunnel(name, flow, paths);
  if(flow != 0) valves++;
}

const tunnels2: {[name:string]: Tunnel} = {};
for(const tunnel of Object.values(tunnels)) {
  if(tunnel.name != "AA" && tunnel.flow == 0) continue;
  const paths: string[] = [];
  const distances: number[] = [];
  const set: Set<string> = new Set();
  set.add(tunnel.name);
  let queue: string[] = Object.assign([], tunnel.paths);
  let dist = 1;
  while(queue.length > 0) {
    const newQueue: string[] = [];
    for(const path of queue) {
      if(set.has(path)) continue;
      if(tunnels[path].flow != 0) {
        paths.push(path);
        distances.push(dist);
      }
      newQueue.push(...tunnels[path].paths);
      set.add(path);
    }
    dist++;
    queue = newQueue;
  }
  tunnels2[tunnel.name] = new Tunnel(tunnel.name, tunnel.flow, paths);
  tunnels2[tunnel.name].distances = distances;
}

const start = "AA";
let queue: Game[] = [];
queue.push(new Game("", start, start, 0, 26, 26));

let biggest = 0;
while(queue.length > 0) {
  const newQueue: Game[] = [];
  for(const game of queue) {
    if(game.valves.length == valves) {
      if(game.pressure > biggest) {
        biggest = game.pressure;
      }
      continue;
    }
    const tunnel = tunnels2[game.pos1];
    let newGames = 0;
    for(const i in tunnel.paths) {
      const path = tunnel.paths[i];
      if(game.valves.includes(path)) continue;
      const newTime = game.minutes1-tunnel.distances[i]-1;
      const newPressure = game.pressure+tunnels2[path].flow*newTime;
      if(newTime <= 0) {
        continue;
      }
      newGames++;
      const tunnel2 = tunnels2[game.pos2];
      for(const j in tunnel2.paths) {
        let path2 = tunnel2.paths[j];
        if(path == path2) continue;
        if(game.valves.includes(path2)) continue;
        let newTime2 = game.minutes2-tunnel2.distances[j]-1;
        let newPressure2 = newPressure+tunnels2[path2].flow*newTime2;
        if(newTime2 <= 0) {
          path2 = game.pos2;
          newPressure2 = newPressure;
          newTime2 = game.minutes2;
        }
        if(path2 == game.pos2) continue;
        const newGame = new Game(game.valves+","+path+","+path2, path, path2, newPressure2, newTime, newTime2);
        newQueue.push(newGame);
        if(newGame.pressure > biggest) {
          biggest = newGame.pressure;
        }
      }
    }
    if(newGames == 0) {
      const tunnel2 = tunnels2[game.pos2];
      for(const j in tunnel2.paths) {
        const path2 = tunnel2.paths[j];
        if(game.valves.includes(path2)) continue;
        const newTime2 = game.minutes2-tunnel2.distances[j]-1;
        const newPressure2 = game.pressure+tunnels2[path2].flow*newTime2;
        if(newTime2 <= 0) continue;
        const newGame = new Game(game.valves+","+path2, game.pos1, path2, newPressure2, game.minutes1, newTime2);
        newQueue.push(newGame);
        if(newGame.pressure > biggest) {
          biggest = newGame.pressure;
        }
      }
    }
  }
  newQueue.sort((a, b) => b.pressure-a.pressure);
  queue = newQueue.slice(0, 100000);
}

console.log(biggest);