const input = Deno.readTextFileSync("15/input.txt");

const sensors = input.split("\r\n").map(x => x.split(": ").map(x => x.split(",").map(x => Number(x.match(/(-)*\d+/)![0])) as [number, number]));

const row: Set<number> = new Set();
const height = 11;
let area = 0;
const lines: [number, number][] = [];

for(const sensor of sensors) {
  const loc = sensor[0];
  const beacon = sensor[1];
  const distance = dist(loc[0], loc[1], beacon[0], beacon[1]);
  const distY = Math.abs(loc[1] - height);
  if(distance < distY) continue;
  const start = loc[0]-distance+distY;
  const end = loc[0]+distance-distY;
  lines.push([start, end]);
}

for(let i=0; i < lines.length; i++) {
  for(let j=0; j < lines.length; j++) {
    if(i==j) continue;
    const line1 = lines[i];
    const line2 = lines[j];
    if(line1[0] > line2[1] || line2[0] > line1[1]) continue;
    lines[i] = [Math.min(line1[0], line2[0]), Math.max(line1[1], line2[1])];
    lines.splice(j, 1);
    j--;
    i = 0;
  }
}

for(const line of lines) {
  area += line[1]-line[0]+1;
  for(const sensor of sensors) {
    const loc = sensor[0];
    const beacon = sensor[1];
    if(loc[1] == height && line[0]<=loc[0] && line[1]>=loc[0]) row.add(loc[0]);
    if(beacon[1] == height && line[0]<=beacon[0] && line[1]>=beacon[0]) row.add(beacon[0]);
  } 
}
area -= row.size;

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.abs(x1-x2) + Math.abs(y1-y2);
}

console.log(area);