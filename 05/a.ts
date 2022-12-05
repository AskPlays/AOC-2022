const input = Deno.readTextFileSync("05/input.txt");

const [map, instructions] = input.split("\r\n\r\n").map(x => x.split("\r\n"));

const stacks: string[][] = [];

for(let x = 0; x < map[0].length/4; x++) {
  stacks.push([]);
  for(let y = map.length-2; y >= 0; y--) {
    if(map[y][x*4+1] != " ") stacks[x].push(map[y][x*4+1]);
  }
}

// console.log(stacks);
for(const instruction of instructions) {
  const nums = instruction.split(" ").map(x => +x).filter(x => !isNaN(x));
  for(let i=0; i<nums[0]; i++) {
    stacks[nums[2]-1].push(stacks[nums[1]-1].pop()!);
  }
}

let score = "";
for(const stack of stacks) {
  score += stack.pop();
}
console.log(score);