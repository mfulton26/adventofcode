export default function solve(input: string) {
  const segments = input.split("\n").map((line) =>
    line.split(" -> ").map((side) => side.split(",").map(Number))
  );
  const grid = new Map<string, number>();
  for (const [[x1, y1], [x2, y2]] of segments) {
    const [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
    const [endX, endY] = [x2 + dx, y2 + dy];
    for (let x = x1, y = y1; x !== endX || y !== endY; x += dx, y += dy) {
      grid.set(`${x},${y}`, (grid.get(`${x},${y}`) ?? 0) + 1);
    }
  }
  let count = 0;
  for (const value of grid.values()) if (value > 1) count++;
  return count;
}
