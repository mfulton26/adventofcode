// @deno-types="./discontinuous-range.d.ts"
import DiscontinuousRange from "npm:discontinuous-range@^1.0.0";
import { parseReports } from "../../reports.ts";
import calculateManhattanDistance from "../../../../../lib/calculateManhattanDistance.ts";

export default function solve(input: string, { y = 2000000 } = {}) {
  const range = new DiscontinuousRange();
  for (const { sensor, closestBeacon } of parseReports(input)) {
    const hypotenuse = calculateManhattanDistance(sensor, closestBeacon);
    const [sensorX, sensorY] = sensor;
    const [closestBeaconX, closestBeaconY] = closestBeacon;
    if (y < sensorY - hypotenuse || y > sensorY + hypotenuse) continue;
    const halfWidth = hypotenuse - Math.abs(sensorY - y);
    const rangeStart = sensorX - halfWidth;
    const rangeEnd = sensorX + halfWidth;
    const discontinuousRange = new DiscontinuousRange(rangeStart, rangeEnd);
    if (y === closestBeaconY) discontinuousRange.subtract(closestBeaconX);
    range.add(discontinuousRange.subtract(range));
  }
  return range.length;
}
