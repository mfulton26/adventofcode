/**
 * @param {string} input
 * @returns {[[number, number], number][][]}
 */
export function parsePaths(input) {
  /** @type {Record<string, [number, number]>} */
  const directionsByChar = {
    R: [+1, 0],
    L: [-1, 0],
    U: [0, +1],
    D: [0, -1],
  };
  return input
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((segment) => [
          directionsByChar[segment[0]],
          Number(segment.slice(1)),
        ])
    );
}
