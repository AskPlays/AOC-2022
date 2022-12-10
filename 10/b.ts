const input = Deno.readTextFileSync("10/input.txt");

const commands = input.split("\r\n").map(line => line.split(" "));

let cycle = 0;
let x = 0;
let sum = "";

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
  if(cycle%40==0) {
    sum += "\n";
  }
  if(Math.abs((cycle)%40-x-1)<2) {
    sum += "#";
  } else sum += ".";
}

console.log(sum);