const input = Deno.readTextFileSync("13/input.txt");

const pairs = input.split("\r\n\r\n").map(x => x.split("\r\n").map(x => JSON.parse(x)));

type List = (List|number)[];

let sum = 0;
for(const i in pairs) {
  const packets = pairs[i];
  if(cmpList(packets[0], packets[1]) == 1) {
    sum += +i+1;
  }
}

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

console.log(sum);