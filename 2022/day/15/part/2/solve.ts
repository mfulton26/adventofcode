import { parseReports } from "../../reports.ts";
import calculateManhattanDistance from "@lib/calculateManhattanDistance.ts";

function* border(
  [centerX, centerY]: [number, number],
  distance: number,
): IterableIterator<[number, number]> {
  for (let x = centerX + distance, y = centerY; x > centerX; x--, y--) {
    yield [x, y];
  }
  for (let x = centerX, y = centerY - distance; y < centerY; x--, y++) {
    yield [x, y];
  }
  for (let x = centerX - distance, y = centerY; x < centerX; x++, y++) {
    yield [x, y];
  }
  for (let x = centerX, y = centerY + distance; y > centerY; x++, y--) {
    yield [x, y];
  }
}

export default function solve(input: string, { limit = 4000000 } = {}) {
  const reports = Array.from(
    parseReports(input),
    ({ sensor, closestBeacon }) => ({
      sensor,
      closestBeacon,
      hypotenuse: calculateManhattanDistance(sensor, closestBeacon),
    }),
  );
  for (const { sensor, hypotenuse } of reports) {
    for (const [x, y] of border(sensor, hypotenuse + 1)) {
      if (x < 0 || x > limit || y < 0 || y > limit) continue;
      if (
        reports.some(({ sensor, hypotenuse }) =>
          calculateManhattanDistance(sensor, [x, y]) <= hypotenuse
        )
      ) continue;
      return x * 4000000 + y;
    }
  }
}
