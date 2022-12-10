const input = Deno.readTextFileSync("10/input.txt");

const commands = input.split("\r\n").map(line => line.split(" "));

let cycle = 1;
let x = 1;
let sum = 0;

for(const [cmd, numStr] of commands) {
  if(cmd == "noop") {
    checkCycle();
    cycle++;
  } else {
    const num = +numStr;
    checkCycle();
    cycle++;
    checkCycle();
    cycle++;
    x += num;
  }
}

function checkCycle() {
  if(cycle%40==20) {
    sum += cycle*x;
  }
}

console.log(sum);