export default function solve(input: string) {
  const segments = input.trim().split("\n").map((line) =>
    line.split(" -> ").map((side) => side.split(",").map(Number))
  );
  const grid = new Map<string, number>();
  for (const [[x1, y1], [x2, y2]] of segments) {
    const [Δx, Δy] = [x2 - x1, y2 - y1];
    const [dx, dy] = [Math.sign(Δx), Math.sign(Δy)];
    const steps = Math.abs(Δx) || Math.abs(Δy);
    for (
      let step = 0, x = x1, y = y1;
      step <= steps;
      step++, x += dx, y += dy
    ) {
      grid.set(`${x},${y}`, (grid.get(`${x},${y}`) ?? 0) + 1);
    }
  }
  let count = 0;
  for (const value of grid.values()) if (value > 1) count++;
  return count;
}
