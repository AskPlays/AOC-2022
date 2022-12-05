const input = Deno.readTextFileSync("04/input.txt");

const pairs = input.split("\r\n");

let score = 0;
for(const pair of pairs) {
  const sections = pair.split(",");
  const [left1, right1, left2, right2] = sections[0].split("-").concat(sections[1].split("-")).map(x => +x);
  if((left1 >= left2 && right1 <= right2) || (left1 <= left2 && right1 >= right2)) {
    score++;
  }
}
console.log(score);