export const x = "";

const input = Deno.readTextFileSync("01/input.txt");

const elves = input.split("\r\n\r\n");

let largest = 0;
let largest2 = 0;
let largest3 = 0;
for(const elf of elves) {
  let total = 0;
  for(const item of elf.split("\n")) {
    total += +item;
  }
  if(total > largest) {
    largest3 = largest2;
    largest2 = largest;
    largest = total;
  } else if(total > largest2) {
    largest3 = largest2;
    largest2 = total;
  } else if(total > largest3) {
    largest3 = total;
  }
}
console.log(largest+largest2+largest3);