/** @type {Record<string, (floor: number) => number>} */
const directions = {
  "(": (floor) => floor + 1,
  ")": (floor) => floor - 1,
};

export function parseDirection(/** @type {string} */ char) {
  return directions[char];
}
