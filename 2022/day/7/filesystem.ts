export type FileInfo = { name: string; parent: DirInfo; size: number };

export class DirInfo {
  name: string;
  parent?: DirInfo;
  subdirs = new Map<string, DirInfo>();
  files = new Map<string, FileInfo>();

  constructor({ name, parent }: { name: string; parent?: DirInfo }) {
    this.name = name;
    this.parent = parent;
  }

  get size() {
    let result = 0;
    for (const subdir of this.subdirs.values()) result += subdir.size;
    for (const file of this.files.values()) result += file.size;
    return result;
  }

  *dirIterator(): IterableIterator<DirInfo> {
    yield this;
    for (const subdir of this.subdirs.values()) {
      yield* subdir.dirIterator();
    }
  }
}

export function parseFromTerminalOutput(text: string) {
  const root = new DirInfo({ name: "" });
  let current = root;
  for (const [entry] of text.matchAll(/^\$.*$(\n^(?!\$).*$)*/gm)) {
    const [command, ...output] = entry.split("\n");
    const [, operation, arg] = command.split(" ");
    switch (operation) {
      case "cd":
        current = arg === "/"
          ? root
          : arg === ".."
          ? current.parent ?? root
          : current.subdirs?.get(arg) ?? root;
        break;
      case "ls":
        for (const line of output) {
          const [info, name] = line.split(" ");
          if (info === "dir") {
            if (current.subdirs.has(name)) continue;
            current.subdirs.set(name, new DirInfo({ name, parent: current }));
            continue;
          }
          const size = parseInt(info);
          current.files.set(name, { name, parent: current, size });
        }
        break;
    }
  }
  return { root };
}
