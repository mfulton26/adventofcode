type Node = { x: number; y: number; path: string; next?: Node };

import md5 from "@lib/md5.ts";

export default function solve(passcode: string) {
  const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;
  let current: Node | undefined = { x: 0, y: 0, path: "" };
  for (let tail = current; current; current = current.next) {
    const { x, y, path } = current;
    if (x === 3 && y === 3) return path;
    if (x < 0 || y < 0 || x >= 4 || y >= 4) continue;
    const hash = md5(`${passcode}${path}`);
    for (const [index, [dx, dy]] of directions.entries()) {
      if (hash[index] <= "a") continue;
      const next = { x: x + dx, y: y + dy, path: `${path}${"UDLR"[index]}` };
      tail = tail.next = next;
    }
  }
}
