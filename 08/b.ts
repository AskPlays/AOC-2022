const input = Deno.readTextFileSync("08/input.txt");

const heights = input.split("\r\n").map(line => line.split("").map(Number));

let best = 0;

for(const y in heights) {
  const row = heights[y];
  for(const x in row) {
    const scenery = checkScenery(+x, +y, heights[y][x]);
    if(scenery > best) {
      best = scenery
      console.log(y, x, scenery)
    }
  }
}

function checkScenery(_x: number, _y: number, height: number) {
  let left = 0, right = 0, up = 0, down = 0;

  for(let x=_x+1; x<heights[_y].length; x++) {
    right++;
    if(heights[_y][x] >= height) {
      break;
    }
  }
  for(let x=_x-1; x>=0; x--) {
    left++;
    if(heights[_y][x] >= height) {
      break;
    }
  }
  for(let y=_y+1; y<heights.length; y++) {
    down++;
    if(heights[y][_x] >= height) {
      break;
    }
  }
  for(let y=_y-1; y>= 0; y--) {
    up++;
    if(heights[y][_x] >= height) {
      break;
    }
  }
  return left*right*up*down;
}

console.log(best);