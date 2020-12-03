/** @type {Record<string, ([x, y]: [number, number]) => [number, number]>} */
const moves = {
  ["^"]: ([x, y]) => [x, y + 1],
  ["v"]: ([x, y]) => [x, y - 1],
  [">"]: ([x, y]) => [x + 1, y],
  ["<"]: ([x, y]) => [x - 1, y],
};

/**
 * @param {string} char
 * @returns {([x, y]: [number, number]) => [number, number]}
 */
export function parseMove(char) {
  return moves[char];
}
