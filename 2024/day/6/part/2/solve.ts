export default function solve(input: string) {
  const grid = input.split("\n").reverse().map((line) => [...line]);
  const [x0, y0] = grid.keys().flatMap((y) => grid[y].keys().map((x) => [x, y]))
    .find(([x, y]) => grid[y][x] === "^")!;
  const seen = new Set<string>();
  for (
    let x = x0, y = y0, dx = 0, dy = 1;
    y in grid && x in grid[y];
    x += dx, y += dy
  ) {
    while (grid[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
    seen.add(`${x},${y}`);
  }
  let count = 0;
  for (const hash of seen) {
    const [x, y] = hash.split(",").map(Number);
    if (grid[y][x] === "^") continue;
    if (loops(grid.with(y, grid[y].with(x, "#")), x0, y0)) count++;
  }
  return count;
}

function loops(grid: string[][], x0: number, y0: number) {
  const traveled = new Set<string>();
  for (
    let x = x0, y = y0, dx = 0, dy = 1;
    y in grid && x in grid[y];
    x += dx, y += dy
  ) {
    while (grid[y + dy]?.[x + dx] === "#") [dx, dy] = [dy, -dx];
    const hash = `${x},${y},${dx},${dy}`;
    if (traveled.has(hash)) return true;
    traveled.add(hash);
  }
  return false;
}
