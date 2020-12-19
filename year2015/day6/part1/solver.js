import { parseInstructions } from "../instructionsParser.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => false)
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
            row[columnIndex] = true;
            break;
          case "turn off":
            row[columnIndex] = false;
            break;
          case "toggle":
            row[columnIndex] = !row[columnIndex];
            break;
        }
      }
    }
  }

  let count = 0;
  for (const row of lights) {
    for (const light of row) {
      if (light) {
        count++;
      }
    }
  }
  return count;
}
