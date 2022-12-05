const input = Deno.readTextFileSync("03/input.txt");

const rucksacks = input.split("\r\n");
const groups: string[][] = [];
let index = 0;
for(const rucksack of rucksacks) {
  if(index%3 === 0) {
    groups.push([]);
  }
  groups[groups.length-1].push(rucksack);
  index++;
}
let score = 0;
for(const group of groups) {
  const map = new Map<string, number>();
  let done = false;
  for(const rucksack of group) {
    const found = new Map<string, boolean>();
    for(const letter of rucksack) {
      if(!found.get(letter)) {
        map.set(letter, (map.get(letter) || 0)+1);
      }
      found.set(letter, true);
      if(map.get(letter) === 3) {
        score += (letter.charCodeAt(0)-38)%58;
        done = true;
        break;
      }
    }
    if(done) {
      break;
    }
  }
}
console.log(score);