import { parseHeights } from "../heightsParser.js";

import sumBy from "../../../lib/sumBy.js";
import withIndex from "../../../lib/withIndex.js";

export function solve(input) {
  const heights = parseHeights(input);
  return heights[withIndex]()[sumBy](([y, row]) =>
    row[withIndex]()[sumBy](([x, height]) =>
      heights.neighbors([x, y]).every(([x, y]) => heights[y][x] > height)
        ? 1 + height
        : 0
    )
  );
}
