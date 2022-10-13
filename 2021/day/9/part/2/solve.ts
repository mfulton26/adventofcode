export default function solve(input: string) {
  const heights = input.split("\n").map((line) => Array.from(line, Number));
  const basinSizes = heights.flatMap((row, y) =>
    row.flatMap((height, x) =>
      findNeighbors(heights, [x, y]).every(([x, y]) => heights[y][x] > height)
        ? [findBasinSize(heights, [x, y])]
        : []
    )
  );
  return basinSizes
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((product, basinSize) => product * basinSize, 1);
}

function findNeighbors(heights: readonly number[][], [x, y]: [number, number]) {
  return [
    [x + 1, y] as const,
    [x, y - 1] as const,
    [x - 1, y] as const,
    [x, y + 1] as const,
  ].filter(([x, y]) => heights[y]?.[x] !== undefined);
}

function findBasinSize(heights: readonly number[][], [x, y]: [number, number]) {
  const seen = new Set();
  const queue = [[x, y] as const];
  while (queue.length) {
    const [x, y] = queue.shift()!;
    const hash = `${y},${x}`;
    if (seen.has(hash)) continue;
    seen.add(hash);
    queue.push(
      ...findNeighbors(heights, [x, y]).filter(([x, y]) => heights[y][x] !== 9),
    );
  }
  return seen.size;
}
