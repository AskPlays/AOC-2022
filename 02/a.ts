const input = Deno.readTextFileSync("02/input.txt");

const rounds = input.split("\r\n");

const win = {
  "AX": 3,
  "AY": 6,
  "AZ": 0,
  "BX": 0,
  "BY": 3,
  "BZ": 6,
  "CX": 6,
  "CY": 0,
  "CZ": 3,
};
const scores = {
  "X": 1,
  "Y": 2,
  "Z": 3,
};
let score = 0;
for(const round of rounds) {
  const strat = round.split(" ") as ["A"|"B"|"C", "X"|"Y"|"Z"];
  score += scores[strat[1]]+win[(strat[0]+strat[1]) as keyof typeof win];
}
console.log(score);