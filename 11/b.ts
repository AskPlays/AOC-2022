const input = Deno.readTextFileSync("11/input.txt");

const lines = input.split("\r\n\r\n").map(line => line.split("\r\n"));

class Monkey {
  inspections: number;
  constructor(public items: number[], public operation: string, public div: number, public targets: number[]) {
    this.items = items;
    this.operation = operation;
    this.div = div;
    this.targets = targets;
    this.inspections = 0;
  }
}

const monkeys: Monkey[] = [];
let old = 0;
let modular = 1;

for(const data of lines) {
  const items = data[1].match(/(\d+(, )*)+/)![0].split(", ").map(num => +(num));
  const operation = data[2].match(/new = (.*)/)![1];
  const div = +(data[3].match(/\d+/)![0]);
  const targets = [+data[4].match(/\d+/)![0], +data[5].match(/\d+/)![0]];
  monkeys.push(new Monkey(items, operation, div , targets));
  modular *= div;
}

for(let i = 0; i < 10000; i++) {
  for(const monkey of monkeys) {
    for(let j = 0; j < monkey.items.length; j++) {
      old = monkey.items[j];
      monkey.items[j] = eval(monkey.operation)%modular;
      monkey.inspections++;
      // monkey.items[j] = Math.floor(monkey.items[j]/3);
      const target = monkey.items[j]%monkey.div == 0 ? monkey.targets[0] : monkey.targets[1];
      monkeys[target].items.push(monkey.items[j]);
    }
    monkey.items = [];
  }
}

let best = 0;
let best2 = 0;
for(const monkey of monkeys) {
  if(monkey.inspections > best) {
    best2 = best;
    best = monkey.inspections;
  } else if(monkey.inspections > best2) {
    best2 = monkey.inspections;
  }
}

console.log(best*best2);