import { parseGrid } from "../../grid.ts";

function count(
  grid: number[][],
  [r0, c0]: [number, number],
  [dr, dc]: [number, number],
) {
  let count = 0;
  for (
    let [r, c] = [r0 + dr, c0 + dc];
    r >= 0 && c >= 0 && r < grid.length && c < grid[r].length;
    [r, c] = [r + dr, c + dc]
  ) {
    count++;
    if (grid[r][c] >= grid[r0][c0]) break;
  }
  return count;
}

export default function solve(input: string) {
  const grid = parseGrid(input);
  const { 0: { length: width }, length: height } = grid;
  function calculateScenicScore(r: number, c: number) {
    return (
      count(grid, [r, c], [0, -1]) * count(grid, [r, c], [-1, 0]) *
      count(grid, [r, c], [+1, 0]) * count(grid, [r, c], [0, +1])
    );
  }
  let max = -Infinity;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const scenicScore = calculateScenicScore(r, c);
      if (scenicScore > max) max = scenicScore;
    }
  }
  return max;
}
