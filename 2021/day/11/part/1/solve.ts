export default function solve(input: string) {
  const levels = input.split("\n").map((line) => Array.from(line, Number));
  const points = <ReadonlyArray<readonly [number, number]>> (
    levels.flatMap((row, y) => row.map((_, x) => [x, y] as const))
  );
  let flashCount = 0;
  for (let step = 1; step <= 100; step++) {
    const queue = points.slice();
    while (queue.length) {
      const [x, y] = queue.shift()!;
      if (levels[y]?.[x] === undefined) continue;
      if (++levels[y][x] === 10) {
        flashCount++;
        queue.push(
          [x + 1, y],
          [x + 1, y - 1],
          [x, y - 1],
          [x - 1, y - 1],
          [x - 1, y],
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1],
        );
      }
    }
    for (const [x, y] of points) if (levels[y][x] >= 10) levels[y][x] = 0;
  }
  return flashCount;
}
