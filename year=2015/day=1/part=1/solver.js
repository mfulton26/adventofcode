import { parseDirection } from "../directionParser.js";

const down = {
  toSum: (a, b) => a + b,
};

function by(selector) {
  return (acc, value) => selector(acc, value);
}

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  return Array.from(input)
    .map(parseDirection)
    .reduce((floor, direction) => direction(floor), 0);

  let floor = 0;
  for (const char of input) {
    const direction = parseDirection(char);
    floor = direction(floor);
  }
  return floor;
}
