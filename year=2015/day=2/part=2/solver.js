import { parseDimensions } from "../dimensionsParser.js";
import { sortNumbers } from "../../../numbers/sorter.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let total = 0;
  for (const line of input.split("\n")) {
    const dimensions = parseDimensions(line);
    const [a, b, c] = sortNumbers(dimensions);
    total += a + a + b + b + a * b * c;
  }
  return total;
}
