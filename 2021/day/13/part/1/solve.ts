export default function solve(input: string) {
  const dots = Array.from(
    input.matchAll(/(?<x>\d+),(?<y>\d+)/g),
    ({ groups }) => ({ x: Number(groups!.x), y: Number(groups!.y) }),
  );
  const folds = Array.from(
    input.matchAll(/(?<coordinate>[xy])=(?<position>\d+)/g),
    ({ groups }) => ({
      coordinate: groups!.coordinate as "x" | "y",
      position: Number(groups!.position),
    }),
  );
  const [{ coordinate, position }] = folds;
  for (const dot of dots) {
    if (dot[coordinate] < position) continue;
    dot[coordinate] = 2 * position - dot[coordinate];
  }
  return new Set(dots.map(({ x, y }) => `${x},${y}`)).size;
}
