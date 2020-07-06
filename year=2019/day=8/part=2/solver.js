/**
 * @param {string} input
 * @param {object} [options]
 * @param {{ width: number; height: number }} [options.size]
 * @returns {number[][]}
 */
export function solve(input, { size = { width: 25, height: 6 } } = {}) {
  const layers = parseLayers(input, size);
  const image = createImageFromLayers(layers, size);
  printImage(image);
  return image;
}

/**
 * @param {string} input
 * @param {{ width: number; height: number }} size
 * @returns {number[][][]}
 */
function parseLayers(input, { width, height }) {
  const layerRegExp = new RegExp(`.{${width * height}}`, "g");
  const rowRegExp = new RegExp(`.{${width}}`, "g");
  const match = input.match(layerRegExp);
  if (match === null) {
    throw new Error("failed to parse input");
  }
  return match.map((layer) => {
    const match = layer.match(rowRegExp);
    if (match === null) {
      throw new Error("failed to parse input");
    }
    return match.map((row) => Array.from(row).map(Number));
  });
}

/**
 * @param {number[][][]} layers
 * @param {{ width: number; height: number }} size
 */
function createImageFromLayers(layers, { width, height }) {
  return Array.from({ length: height }, (_, r) =>
    Array.from({ length: width }, (_, c) => {
      for (const layer of layers) {
        const pixel = layer[r][c];
        if (pixel !== 2) {
          return pixel;
        }
      }
      throw new Error("failed to create image from layers");
    })
  );
}

/**
 * @param {number[][]} image
 */
function printImage(image) {
  console.log(
    image
      .map((row) => row.map((pixel) => (pixel ? "█" : " ")).join(""))
      .join("\n")
  );
}
