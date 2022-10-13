export default function solve(input: string) {
  const heights = input.split("\n").map((line) => Array.from(line, Number));
  const lows = heights.flatMap((row, y) =>
    row.filter((height, x) => {
      const neighbors = findNeighbors(heights, [x, y]);
      return neighbors.every(([x, y]) => heights[y][x] > height);
    })
  );
  return lows.reduce((sum, low) => sum + 1 + low, 0);
}

function findNeighbors(heights: readonly number[][], [x, y]: [number, number]) {
  return [
    [x + 1, y] as const,
    [x, y - 1] as const,
    [x - 1, y] as const,
    [x, y + 1] as const,
  ].filter(([x, y]) => heights[y]?.[x] !== undefined);
}
