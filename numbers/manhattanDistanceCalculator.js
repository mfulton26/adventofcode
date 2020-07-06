/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
export function calculateManhattanDistance(a, b) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += Math.abs(a[i] - b[i]);
  }
  return result;
}
