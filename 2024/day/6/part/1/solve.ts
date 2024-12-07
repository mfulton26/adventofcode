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
  return seen.size;
}
