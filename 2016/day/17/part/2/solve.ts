import md5 from "@lib/md5.ts";

export default function solve(passcode: string) {
  let maxLength = -Infinity;
  const stack = [{ x: 0, y: 0, path: "" }];
  const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;
  while (stack.length) {
    const { x, y, path } = stack.pop()!;
    if (x === 3 && y === 3) {
      if (path.length > maxLength) maxLength = path.length;
      continue;
    }
    if (x < 0 || y < 0 || x >= 4 || y >= 4) continue;
    const hash = md5(`${passcode}${path}`);
    for (const [index, [dx, dy]] of directions.entries()) {
      if (hash[index] <= "a") continue;
      stack.push({ x: x + dx, y: y + dy, path: `${path}${"UDLR"[index]}` });
    }
  }
  return maxLength;
}
