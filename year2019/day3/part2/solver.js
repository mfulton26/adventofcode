import { parsePaths } from "../pathsParser.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  /** @type {[number, number]} */
  const centralPoint = [0, 0];
  const paths = parsePaths(input);
  const intersections = findIntersections(centralPoint, paths);
  const fewestCombinedStepCounts = intersections.map(({ stepCountsByPath }) =>
    Array.from(stepCountsByPath.values())
      .sort()
      .slice(0, 2)
      .reduce((sum, value) => sum + value, 0)
  );
  return Math.min(...fewestCombinedStepCounts);
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
    let stepCount = 0;
    for (const [[dx, dy], amount] of path) {
      for (let i = 0; i < amount; i++) {
        x += dx;
        y += dy;
        stepCount++;
        if (!grid.has(y)) {
          grid.set(y, new Map());
        }
        const row = grid.get(y);
        if (!row.has(x)) {
          row.set(x, new Map());
        }
        const stepCountsByPath = row.get(x);
        if (!stepCountsByPath.has(path)) {
          stepCountsByPath.set(path, stepCount);
          if (stepCountsByPath.size === 2) {
            intersections.push({
              point: [x, y],
              stepCountsByPath,
            });
          }
        }
      }
    }
  }
  return intersections;
}
