const input = Deno.readTextFileSync("01/input.txt");

const elves = input.split("\r\n\r\n");

let largest = 0;
for(const elf of elves) {
  let total = 0;
  for(const item of elf.split("\n")) {
    total += +item;
  }
  if(total > largest) {
    largest = total;
  } 
}
console.log(largest);