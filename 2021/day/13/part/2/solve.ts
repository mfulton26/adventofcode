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
  const lengths = {
    x: Math.max(...dots.map(({ x }) => x)),
    y: Math.max(...dots.map(({ y }) => y)),
  };
  for (const { coordinate, position } of folds) {
    for (const dot of dots) {
      if (dot[coordinate] < position) continue;
      dot[coordinate] = 2 * position - dot[coordinate];
    }
    lengths[coordinate] = position;
  }
  const paper = Array.from(
    { length: lengths.y },
    () => Array.from({ length: lengths.x }, () => " "),
  );
  for (const { x, y } of dots) paper[y][x] = "█";
  return paper.map((line) => line.join("")).join("\n");
}
