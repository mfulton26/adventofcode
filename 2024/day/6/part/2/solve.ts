// todo: reduce code duplication
// todo: find a faster solution

function loops(grid: string[][]) {
  const { length: height, 0: { length: width } } = grid;
  let [x, y] = grid.keys().flatMap((y) => grid[y].keys().map((x) => [x, y]))
    .find(([x, y]) => grid[y][x] === "^")!;
  let dx = 0, dy = 1;
  const traveled = new Set<string>();
  while (x >= 0 && x < width && y >= 0 && y < height) {
    const hash = `${x},${y},${dx},${dy}`;
    if (traveled.has(hash)) return true;
    traveled.add(hash);
    while (grid[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
    x += dx, y += dy;
  }
  return false;
}

export default function solve(input: string) {
  const grid = input.split("\n").reverse().map((line) => [...line]);
  const { length: height, 0: { length: width } } = grid;
  let [x, y] = grid.keys().flatMap((y) => grid[y].keys().map((x) => [x, y]))
    .find(([x, y]) => grid[y][x] === "^")!;
  let dx = 0, dy = 1;
  const seen = new Set<string>();
  while (x >= 0 && x < width && y >= 0 && y < height) {
    seen.add(`${x},${y}`);
    while (grid[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
    x += dx, y += dy;
  }
  let count = 0;
  for (const hash of seen) {
    const [x, y] = hash.split(",").map(Number);
    if (grid[y][x] === "^") continue;
    if (loops(grid.with(y, grid[y].with(x, "#")))) count++;
  }
  return count;
}
