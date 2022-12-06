const input = Deno.readTextFileSync("06/input.txt");

const buffer = input;

const set = new Set();
const stack: string[] = [];
let index = 0;

for(const letter of buffer) {
  index++;
  stack.push(letter);
  set.add(letter);
  if(set.size == 4) break;
  if(stack.length == 4) {
    const first = stack.shift()!;
    if(!stack.includes(first)) set.delete(first);
  }
}
console.log(index);