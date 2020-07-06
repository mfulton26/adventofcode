/**
 * @param {string} input
 * @param {object} [options]
 * @param {{ width: number; height: number }} [options.size]
 * @returns {number}
 */
export function solve(input, { size = { width: 25, height: 6 } } = {}) {
  const layers = parseLayers(input, size);
  const [digitCountsWithFewestZeroDigits] = layers
    .map(layerToDigitCounts)
    .sort((a, b) => a[0] - b[0]);
  return (
    digitCountsWithFewestZeroDigits[1] * digitCountsWithFewestZeroDigits[2]
  );
}

/**
 * @param {string} input
 * @param {{ width: number; height: number }} size
 * @returns {number[][]}
 */
function parseLayers(input, { width, height }) {
  const match = input.match(new RegExp(`.{${width * height}}`, "g"));
  if (match === null) {
    throw new Error("failed to parse input");
  }
  return match.map((layer) => Array.from(layer).map(Number));
}

/**
 * @param {number[]} layer
 */
function layerToDigitCounts(layer) {
  return layer.reduce(
    (digitCounts, digit) => {
      digitCounts[digit]++;
      return digitCounts;
    },
    Array.from({ length: 10 }, () => 0)
  );
}
