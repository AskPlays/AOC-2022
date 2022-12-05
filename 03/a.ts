const input = Deno.readTextFileSync("03/input.txt");

const rucksacks = input.split("\r\n");

let score = 0;
for(const rucksack of rucksacks) {
  const first = rucksack.slice(0, rucksack.length/2);
  const second = rucksack.slice(rucksack.length/2, rucksack.length);
  for(const letter of first) {
    if(second.includes(letter)) {
      score += (letter.charCodeAt(0)-38)%58;
      break;
    }
  }
}
console.log(score);