import { parseDirection } from "../directionParser.js";

export function solve(/** @type {string} */ input) {
  let floor = 0;
  for (const char of input) {
    const direction = parseDirection(char);
    floor = direction(floor);
  }
  return floor;
}
