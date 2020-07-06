import { parsePaths } from "../pathsParser.js";
import { calculateManhattanDistance } from "../../../numbers/manhattanDistanceCalculator.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  /** @type {[number, number]} */
  const centralPoint = [0, 0];
  const paths = parsePaths(input);
  const intersections = findIntersections(centralPoint, paths);
  const manhattanDistances = intersections.map(({ point }) =>
    calculateManhattanDistance(centralPoint, point)
  );
  return Math.min(...manhattanDistances);
}

/**
 *
 * @param {[number, number]} centralPoint
 * @param {[[number, number], number][][]} paths
 */
function findIntersections(centralPoint, paths) {
  const intersections = [];
  const grid = new Map();
  for (const path of paths) {
    let [x, y] = centralPoint;
    for (const [[dx, dy], amount] of path) {
      for (let i = 0; i < amount; i++) {
        x += dx;
        y += dy;
        if (!grid.has(y)) {
          grid.set(y, new Map());
        }
        const row = grid.get(y);
        if (!row.has(x)) {
          row.set(x, new Set());
        }
        const intersectingPaths = row.get(x);
        if (!intersectingPaths.has(path)) {
          intersectingPaths.add(path);
          if (intersectingPaths.size === 2) {
            intersections.push({
              point: [x, y],
              paths: intersectingPaths,
            });
          }
        }
      }
    }
  }
  return intersections;
}
