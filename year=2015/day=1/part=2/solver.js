import { parseDirection } from "../directionParser.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let position = 0;
  let floor = 0;
  for (const char of input) {
    ++position;
    const direction = parseDirection(char);
    floor = direction(floor);
    if (floor < 0) {
      return position;
    }
  }
  throw new Error("position not found");
}
