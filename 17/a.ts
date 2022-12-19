const input = Deno.readTextFileSync("17/input.txt");

const jets = input.split("");
let highest = -1;

type Types = 0 | 1 | 2 | 3 | 4;

class Piece {
  constructor(public x: number, public y: number, public type: Types) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  getBlocks(): [number, number][] {
    switch(this.type) {
      case 3:
        return [[this.x-1, this.y+3], [this.x-1, this.y+2], [this.x-1, this.y+1], [this.x-1, this.y]];
      case 4:
        return [[this.x-1, this.y+1], [this.x-1, this.y], [this.x, this.y+1], [this.x, this.y]];
      case 0:
        return [[this.x-1, this.y], [this.x, this.y], [this.x+1, this.y], [this.x+2, this.y]];
      case 1:
        return [[this.x, this.y+2], [this.x, this.y+1], [this.x-1, this.y+1], [this.x+1, this.y+1], [this.x, this.y]];
      case 2:
        return [[this.x+1, this.y+2], [this.x + 1, this.y+1], [this.x + 1, this.y], [this.x, this.y], [this.x-1, this.y]];
    }
  }
  collide(cx: number, cy: number): boolean {
    const blocks = this.getBlocks();
    for(const [x, y] of blocks) {
      if(x+cx < 0 || x+cx >= 7 || y+cy < 0) return true;
      if(board[x+cx][y+cy]) return true;
    }
    return false;
  }
  setBlocks(): void {
    const blocks = this.getBlocks();
    for(const [x, y] of blocks) {
      board[x][y] = true;
      if(y > highest) highest = y;
    }
  }
}

const board: boolean[][] = Array(7).fill(0).map(_x=>[]);

let type = 0;
let jetIndex = 0;
while(type < 2022) {
  const piece = new Piece(3, highest+4, type++%5 as Types);
  while(true) {
    const jet = jets[jetIndex++%jets.length] == '<' ? -1 : 1;
    if(!piece.collide(jet, 0)) piece.x += jet;
    if(!piece.collide(0, -1)) piece.y--;
    else break;
  }
  piece.setBlocks();
}

console.log(highest+1);