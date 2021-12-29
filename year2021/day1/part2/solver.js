import { parseDepths } from "../depthsParser.js";

import count from "../../../lib/count.js";
import windowed from "../../../lib/windowed.js";

export function solve(input) {
  return parseDepths(input)
    [windowed](4)
    [count](([a, , , b]) => b > a);
}
