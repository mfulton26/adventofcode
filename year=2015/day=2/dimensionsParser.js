export function parseDimensions(/** @type {string} */ text) {
  return text.split("x").map(Number);
}
