import { parseDepths } from "../depthsParser.js";

import count from "../../../lib/count.js";
import sum from "../../../lib/sum.js";
import windowed from "../../../lib/windowed.js";

export function solve(input) {
  return parseDepths(input)
    [windowed](3)
    .map((window) => window[sum]())
    [windowed](2)
    [count](([a, b]) => b > a);
}
