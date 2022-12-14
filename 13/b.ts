const input = Deno.readTextFileSync("13/input.txt");

const pairs = input.split("\r\n\r\n").map(x => x.split("\r\n").map(x => JSON.parse(x) as List));

type List = (List|number)[];

const packets: List[] = [];

for(const i in pairs) {
  packets.push(pairs[i][0], pairs[i][1]);
}

packets.push([[2]], [[6]]);
packets.sort((a, b) => -cmpList(a, b));

function cmpInt(a: number, b: number) {
  if(a < b) return 1;
  if(a > b) return -1;
  return 0;
}

function cmpList(a: List, b: List) {
  let len = Math.min(a.length, b.length);
  for(let i = 0; i < len; i++) {
    let elmA = a[i];
    let elmB = b[i];
    if(typeof elmA == "number" && typeof elmB == "number") {
      let res = cmpInt(elmA, elmB);
      if(res == -1) return -1;
      if(res == 1) return 1;
    } else if(typeof elmA == "object" && typeof elmB == "object") {
      let res = cmpList(elmA, elmB)
      if(res == -1) return -1;
      if(res == 1) return 1;
    } else {
      let listA = typeof elmA == "number" ? [elmA] : elmA;
      let listB = typeof elmB == "number" ? [elmB] : elmB;
      let res = cmpList(listA, listB);
      if(res == -1) return -1;
      if(res == 1) return 1;
    }
  }
  if(b.length < a.length) return -1;
  if(b.length == a.length) return 0;
  return 1;
}

let key = 0;
for(const index in packets) {
  const packet = packets[index];
  if(packet.length == 1 && typeof packet[0] == 'object' && packet[0].length == 1 && (packet[0][0] == 2 || packet[0][0] == 6)) {
    if(key == 0) key += +index+1;
    else key *= +index+1;
  }
}

console.log(key);