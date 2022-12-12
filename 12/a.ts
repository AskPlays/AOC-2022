const input = Deno.readTextFileSync("12/input.txt");

const lines = input.split("\r\n");

class Pos {
  constructor(public x: number, public y: number, public height: number) {
    this.x = x;
    this.y = y;
    this.height = height;
  }
}

let start = new Pos(0,0,0);
let end = new Pos(0,0,0);
for(const y in lines) {
  const line = lines[y];
  const startIndex = line.indexOf("S");
  if(startIndex != -1) {
    start = new Pos(startIndex, +y, 0);
  }
  const endIndex = line.indexOf("E");
  if(endIndex != -1) {
    end = new Pos(endIndex, +y, 25);
  }
}

const set: Set<string> = new Set<string>();
set.add(start.x + "," + start.y);
let queue = [start];
let steps = 0;
let searching = true;
while(searching) {
  steps++;
  const newQueue: Pos[] = [];
  for(const pos of queue) {
    if(pos.x == end.x && pos.y == end.y) {
      searching = false;
      steps--;
      break;
    }
    if(!set.has(pos.x+1+","+pos.y) && getHeight(lines[pos.y][pos.x+1]) <= pos.height+1) {
      newQueue.push(new Pos(pos.x+1, pos.y, getHeight(lines[pos.y][pos.x+1])));
      set.add(pos.x+1+","+pos.y);
    }
    if(!set.has(pos.x-1+","+pos.y) && getHeight(lines[pos.y][pos.x-1]) <= pos.height+1) {
      newQueue.push(new Pos(pos.x-1, pos.y, getHeight(lines[pos.y][pos.x-1])));
      set.add(pos.x-1+","+pos.y);
    }
    if(!set.has(pos.x+","+(pos.y+1)) && pos.y < lines.length-1 && getHeight(lines[pos.y+1][pos.x]) <= pos.height+1) {
      newQueue.push(new Pos(pos.x, pos.y+1, getHeight(lines[pos.y+1][pos.x])));
      set.add(pos.x+","+(pos.y+1));
    }
    if(!set.has(pos.x+","+(pos.y-1)) && pos.y>0 && getHeight(lines[pos.y-1][pos.x]) <= pos.height+1) {
      newQueue.push(new Pos(pos.x, pos.y-1, getHeight(lines[pos.y-1][pos.x])));
      set.add(pos.x+","+(pos.y-1));
    }    
  }
  queue = newQueue;
}

function getHeight(letter: string) {
  if(!letter) return 27;
  if(letter == 'E') return 25;
  return letter.charCodeAt(0) - 97;
}

console.log(steps);