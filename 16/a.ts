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
  constructor(public valves: string[], public pos: string, public pressure: number, public minutes: number) {
    this.valves = valves;
    this.pos = pos;
    this.pressure =  pressure;
    this.minutes = minutes;
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
queue.push(new Game([], start, 0, 30));

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
    const tunnel = tunnels2[game.pos];
    for(const i in tunnel.paths) {
      const path = tunnel.paths[i];
      if(game.valves.includes(path)) continue;
      const newTime = game.minutes-tunnel.distances[i]-1;
      if(newTime <= 0) continue;
      const newGame = new Game([...game.valves, path], path, game.pressure+tunnels2[path].flow*newTime, newTime);
      newQueue.push(newGame);
      if(newGame.pressure > biggest) {
        biggest = newGame.pressure;
      }
    }
  }
  queue = newQueue;
}

console.log(biggest);