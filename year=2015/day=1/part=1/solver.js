import { parseDirection } from "../directionParser.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let floor = 0;
  for (const char of input) {
    const direction = parseDirection(char);
    floor = direction(floor);
  }
  return floor;
}
