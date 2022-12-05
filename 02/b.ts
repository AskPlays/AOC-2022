const input = Deno.readTextFileSync("02/input.txt");

const rounds = input.split("\r\n");

const symbol: {[key:string]: "R"|"P"|"S"} = {
  "AX": "S",
  "AY": "R",
  "AZ": "P",
  "BX": "R",
  "BY": "P",
  "BZ": "S",
  "CX": "P",
  "CY": "S",
  "CZ": "R",
};
const win = {
  "X": 0,
  "Y": 3,
  "Z": 6,
};
const scores = {
  "R": 1,
  "P": 2,
  "S": 3,
};
let score = 0;
for(const round of rounds) {
  const strat = round.split(" ") as ["A"|"B"|"C", "X"|"Y"|"Z"];
  score += win[strat[1]]+scores[symbol[(strat[0]+strat[1]) as keyof typeof symbol]];
}
console.log(score);