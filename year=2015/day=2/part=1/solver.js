import { parseDimensions } from "../dimensionsParser.js";
import { compareNumerically } from "../../../arrays/numericalComparer.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let total = 0;
  for (const line of input.split("\n")) {
    const dimensions = parseDimensions(line);
    const [a, b, c] = dimensions.sort(compareNumerically);
    total += 3 * a * b + 2 * b * c + 2 * c * a;
  }
  return total;
}
