import { parseDepths } from "../depthsParser.js";

import count from "../../../lib/count.js";
import windowed from "../../../lib/windowed.js";

export function solve(input) {
  return parseDepths(input)
    [windowed](2)
    [count](([a, b]) => b > a);
}
