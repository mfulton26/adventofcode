import { parseDepths } from "../depthsParser.js";

import count from "../../../lib/count.js";
import chunked from "../../../lib/chunked.js";

export function solve(input) {
  return parseDepths(input)
    [chunked](4)
    [count](([a, , , b]) => b > a);
}
