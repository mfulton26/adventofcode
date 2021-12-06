import { parseLineSegments } from "../lineSegmentsParser.js";

import HashMap from "../../../lib/HashMap.js";

import count from "../../../lib/count.js";
import update from "../../../lib/update.js";

export function solve(input) {
  const segments = parseLineSegments(input);
  const grid = new HashMap();
  for (const [[x1, y1], [x2, y2]] of segments) {
    const [Δx, Δy] = [x2 - x1, y2 - y1];
    const [dx, dy] = [Math.sign(Δx), Math.sign(Δy)];
    const steps = Math.abs(Δx) || Math.abs(Δy);
    for (let step = 0, x = x1, y = y1; step <= steps; step++, x += dx, y += dy)
      grid[update]([x, y], (count = 0) => count + 1);
  }
  return grid.values()[count]((value) => value > 1);
}
