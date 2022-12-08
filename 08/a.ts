const input = Deno.readTextFileSync("08/input.txt");

const heights = input.split("\r\n").map(line => line.split("").map(Number));

const map: Map<string, boolean> = new Map<string, boolean>();

for(const y in heights) {
  const row = heights[y];
  let tallest = -1;
  for(const x in row) {
    const height = row[x];
    if(height > tallest) {
      if(!map.get(x+","+y)) map.set(x+","+y, true);
      tallest = height;
    }
  }
  tallest = -1;
  for(const _x in row) {
    const x = row.length-(+_x)-1;
    const height = row[x];
    if(height > tallest) {
      if(!map.get(x+","+y))  map.set(x+","+y, true); 
      tallest = height;
    }
  }
}

for(let x=0; x<heights[0].length; x++) {
  let tallest = -1;
  for(const y in heights) {
    const row = heights[y];
    if(row[x] > tallest) {
      if(!map.get(x+","+y)) map.set(x+","+y, true); 
      tallest = row[x];
    }
  }
  tallest = -1;
  for(const _y in heights) {
    const y = heights.length-(+_y)-1;
    const row = heights[y];
    if(row[x] > tallest) {
      if(!map.get(x+","+y)) map.set(x+","+y, true); 
      tallest = row[x];
    }
  }
}

console.log(map.size);