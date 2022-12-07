const input = Deno.readTextFileSync("07/input.txt");

const commands = input.split("$ ").slice(1);

class Directory {
  list: {[key: string]: Directory} = {};
  size: number = 0;
  parent: Directory;
  constructor(parent?: Directory, size?: number) {
    this.parent = parent ?? this;
    this.size = size ?? 0;
  }
  contains(): number {
    let sum = 0;
    for(const dir of Object.values(this.list)) sum += dir.contains();
    return sum+this.size;
  }
}

const dirs: Directory[] = [new Directory()];
let curDir: Directory = dirs[0];

for(const command of commands) {
  const lines = command.split("\r\n");
  if(lines[0] == "ls") {
    for(const line of lines.slice(1)) {
      const [type, name] = line.split(" ");
      if(type == "dir") {
        const dir = new Directory(curDir);
        curDir.list[name] = dir;
        dirs.push(dir);
      } else {
        const size = +type;
        curDir.list[name] = new Directory(curDir, size);
      }
    }
  } else {
    const dirName = lines[0].replace("cd ", "");
    if(dirName == "..") curDir = curDir.parent;
    else {
      if(curDir.list[dirName]) curDir = curDir.list[dirName];
    }
  }
}

let sum = 0;
for(const dir of dirs) {
  const size = dir.contains();
  if(size <= 100000) sum += size;
}

console.log(sum);

