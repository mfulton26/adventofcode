import { parseHeights } from "../heightsParser.js";

export function solve(input) {
  const heights = parseHeights(input);
  const basinSizes = heights.flatMap((row, y) =>
    row.flatMap((height, x) =>
      heights.neighbors([x, y]).every(([x, y]) => heights[y][x] > height)
        ? [heights.findBasinSize([x, y])]
        : []
    )
  );
  return basinSizes
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((product, basinSize) => product * basinSize, 1);
}
