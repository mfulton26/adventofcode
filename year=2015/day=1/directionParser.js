/** @type {Record<string, (floor: number) => number>} */
const directions = {
  "(": (floor) => floor + 1,
  ")": (floor) => floor - 1,
};

/**
 * @param {string} char
 * @returns {(floor: number) => number}
 */
export function parseDirection(char) {
  return directions[char];
}
