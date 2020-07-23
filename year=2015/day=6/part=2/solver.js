import { parseInstructions } from "../instructionsParser.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );

  for (const {
    name,
    clientRect: { left, top, right, bottom },
  } of parseInstructions(input)) {
    for (let rowIndex = top; rowIndex <= bottom; rowIndex++) {
      const row = lights[rowIndex];
      for (let columnIndex = left; columnIndex <= right; columnIndex++) {
        switch (name) {
          case "turn on":
            row[columnIndex] += 1;
            break;
          case "turn off":
            if (row[columnIndex] > 0) {
              row[columnIndex] -= 1;
            }
            break;
          case "toggle":
            row[columnIndex] += 2;
            break;
        }
      }
    }
  }

  let total = 0;
  for (const row of lights) {
    for (const light of row) {
      total += light;
    }
  }
  return total;
}
