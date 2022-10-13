export default function solve(input: string) {
  const dots = Array.from(
    input.matchAll(/(?<x>\d+),(?<y>\d+)/g),
    ({ groups }) => ({ x: Number(groups!.x), y: Number(groups!.y) }),
  );
  const foldInstructions = Array.from(
    input.matchAll(/(?<coordinate>[xy])=(?<position>\d+)/g),
    ({ groups }) => ({
      coordinate: groups!.coordinate as "x" | "y",
      position: Number(groups!.position),
    }),
  );
  const paperSize = {
    x: Math.max(...dots.map(({ x }) => x)),
    y: Math.max(...dots.map(({ y }) => y)),
  };
  for (const { coordinate, position } of foldInstructions) {
    for (const dot of dots) {
      if (dot[coordinate] < position) continue;
      dot[coordinate] = 2 * position - dot[coordinate];
    }
    paperSize[coordinate] = position;
  }
  const positions = Array.from(
    { length: paperSize.y },
    () => Array.from({ length: paperSize.x }, () => "."),
  );
  for (const { x, y } of dots) positions[y][x] = "#";
  return positions.map((line) => line.join("")).join("\n");
}
