const input = Deno.readTextFileSync("09/input.txt");

const moves = input.split("\r\n").map(line => line.split(" "));

const visited: Set<string> = new Set<string>();

const knots: {x:number, y:number}[] = [];
for(let i=0; i<10; i++) {
  knots.push({x:0, y:0});
}

for(const [dir, lengthStr] of moves) {
  const length = +lengthStr;
  for(let i=0; i<length; i++) {
    switch(dir) {
      case "R":
        knots[0].x += 1;
        break;
      case "L":
        knots[0].x -= 1;
        break;
      case "U":
        knots[0].y += 1;
        break;
      case "D":
        knots[0].y -= 1;
        break;
    }
    for(let i=0; i<knots.length-1; i++) {
      const head = knots[i];
      const tail = knots[i+1];
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
    }
    const key = `${knots[9].x},${knots[9].y}`;
    visited.add(key);
  }
}

console.log(visited.size);