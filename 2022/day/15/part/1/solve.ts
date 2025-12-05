import calculateManhattanDistance from "@lib/calculateManhattanDistance.ts";
import Range from "@lib/Range.ts";
import RangeSet from "@lib/RangeSet.ts";
import { parseReports } from "../../reports.ts";

export default function solve(input: string, { y = 2000000 } = {}) {
  let rangeSet = new RangeSet();
  for (const { sensor, closestBeacon } of parseReports(input)) {
    const hypotenuse = calculateManhattanDistance(sensor, closestBeacon);
    const [sensorX, sensorY] = sensor;
    const [closestBeaconX, closestBeaconY] = closestBeacon;
    if (y < sensorY - hypotenuse || y > sensorY + hypotenuse) continue;
    const halfWidth = hypotenuse - Math.abs(sensorY - y);
    const start = sensorX - halfWidth;
    const end = sensorX + halfWidth + 1;
    let newSet = new RangeSet([new Range(start, end)]);
    if (y === closestBeaconY) {
      newSet.delete(new Range(closestBeaconX, closestBeaconX + 1));
    }
    newSet = newSet.difference(rangeSet);
    rangeSet = rangeSet.union(newSet);
  }
  return rangeSet.size;
}
