import { parseGrid } from "../../grid.ts";

function isVisible(
  grid: number[][],
  [r0, c0]: [number, number],
  [dr, dc]: [number, number],
) {
  for (
    let [r, c] = [r0 + dr, c0 + dc];
    r >= 0 && c >= 0 && r < grid.length && c < grid[r].length;
    [r, c] = [r + dr, c + dc]
  ) {
    if (grid[r][c] >= grid[r0][c0]) return false;
  }
  return true;
}

export default function solve(input: string) {
  const grid = parseGrid(input);
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (
        isVisible(grid, [r, c], [0, -1]) || isVisible(grid, [r, c], [0, +1]) ||
        isVisible(grid, [r, c], [-1, 0]) || isVisible(grid, [r, c], [+1, 0])
      ) count++;
    }
  }
  return count;
}
