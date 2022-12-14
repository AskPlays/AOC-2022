const input = Deno.readTextFileSync("14/input.txt");

const rocks = input.split("\r\n").map(x => x.split(" -> ").map(x => x.split(",").map(Number) as [number, number]));

function rockPath(x1: number, y1: number, x2: number, y2: number) {
  if(x1 != x2) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    for(let x=minX; x<=maxX; x++) {
      if(!cave[x]) cave[x] = [];
      cave[x][y1] = "#";
      if(y1 > height) height = y1;
    }
  } else if(y1 != y2) {
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    for(let y=minY; y<=maxY; y++) {
      if(!cave[x1]) cave[x1] = [];
      cave[x1][y] = "#"
      if(y > height) height = y;
    }
  }
}

let height = 0;
const cave: string[][] = [];

for(const path of rocks) {
  for(let i = 1; i < path.length; i++) {
    rockPath(path[i-1][0], path[i-1][1], path[i][0], path[i][1]);
  }
}

let sum = 0;
let sand = {x: 500, y: 0};
while(true) {
  if(!cave[sand.x]) cave[sand.x] = [];
  if(!cave[sand.x-1]) cave[sand.x-1] = [];
  if(!cave[sand.x+1]) cave[sand.x+1] = [];
  if(sand.y == height+1) {
    sum++;
    cave[sand.x][sand.y] = "o";
    sand = {x: 500, y: 0}; 
  } else if(!cave[sand.x][sand.y+1]) sand.y++;
  else if(!cave[sand.x-1][sand.y+1]) {
    sand.x--;
    sand.y++;
  } else if(!cave[sand.x+1][sand.y+1]) {
    sand.x++;
    sand.y++;
  } else {
    sum++;
    cave[sand.x][sand.y] = "o";
    if(sand.x == 500 && sand.y == 0) break;
    sand = {x: 500, y: 0}; 
  }
}
console.log(sum);