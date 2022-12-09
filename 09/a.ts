const input = Deno.readTextFileSync("09/input.txt");

const moves = input.split("\r\n").map(line => line.split(" "));

const visited: Set<string> = new Set<string>();

const head = {x:0, y:0};
const tail = {x:0, y:0};

for(const [dir, lengthStr] of moves) {
  const length = +lengthStr;
  for(let i=0; i<length; i++) {
    switch(dir) {
      case "R":
        head.x += 1;
        break;
      case "L":
        head.x -= 1;
        break;
      case "U":
        head.y += 1;
        break;
      case "D":
        head.y -= 1;
        break;
    }
    if((Math.abs(head.x-tail.x)>1 && head.y!=tail.y) || (Math.abs(head.y-tail.y)>1 && head.x!=tail.x)) {
      if(head.x>tail.x) {
        tail.x++;
      } else {
        tail.x--;
      }
      if(head.y>tail.y) {
        tail.y++;
      } else {
        tail.y--;
      }
    } else if(Math.abs(head.x-tail.x)>1) {
      if(head.x>tail.x) {
        tail.x++;
      } else {
        tail.x--;
      }
    } else if(Math.abs(head.y-tail.y)>1) {
      if(head.y>tail.y) {
        tail.y++;
      } else {
        tail.y--;
      }
    }
    const key = `${tail.x},${tail.y}`;
    visited.add(key);
  }
}

console.log(visited.size);