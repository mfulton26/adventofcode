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
  return seen.size;
}
