/**
 * @param {string} text
 * @return {number[]}
 */
export function parseDimensions(text) {
  return text.split("x").map(Number);
}
