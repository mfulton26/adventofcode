const directionChars = {
  "^": { x: 0, y: 1 },
  ">": { x: 1, y: 0 },
  "v": { x: 0, y: -1 },
  "<": { x: -1, y: 0 },
};

const directions = Object.values(directionChars);

export default function solve(input: string) {
  const map = input.split("\n");
  const { length: height, 0: { length: width } } = map;
  let max = -Infinity;
  const stack = [{ x: 1, y: 0, visited: new Set<number>() }];
  while (stack.length) {
    const { x, y, visited: seen } = stack.pop()!;
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (map[y][x] === "#") continue;
    const hash = y * height + x;
    if (seen.has(hash)) continue;
    if (y === height - 1 && seen.size > max) max = seen.size;
    const visited = new Set(seen).add(hash);
    const dList = map[y][x] === "."
      ? directions
      : [directionChars[map[y][x] as keyof typeof directionChars]];
    for (const d of dList) stack.push({ x: x + d.x, y: y - d.y, visited });
  }
  return max;
}
