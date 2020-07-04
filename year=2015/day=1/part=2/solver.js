import { parseDirection } from "../directionParser.js";

export function solve(/** @type {string} */ input) {
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
}
