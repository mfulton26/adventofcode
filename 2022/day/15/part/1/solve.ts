import calculateManhattanDistance from "@lib/calculateManhattanDistance.ts";
import Interval from "@lib/Interval.ts";
import IntervalSet from "@lib/IntervalSet.ts";
import { parseReports } from "../../reports.ts";

export default function solve(input: string, { y = 2000000 } = {}) {
  let intervalSet = new IntervalSet();
  for (const { sensor, closestBeacon } of parseReports(input)) {
    const hypotenuse = calculateManhattanDistance(sensor, closestBeacon);
    const [sensorX, sensorY] = sensor;
    const [closestBeaconX, closestBeaconY] = closestBeacon;
    if (y < sensorY - hypotenuse || y > sensorY + hypotenuse) continue;
    const halfWidth = hypotenuse - Math.abs(sensorY - y);
    const rangeStart = sensorX - halfWidth;
    const rangeEnd = sensorX + halfWidth;
    let newSet = new IntervalSet([new Interval(rangeStart, rangeEnd)]);
    if (y === closestBeaconY) newSet.delete(Interval.of(closestBeaconX));
    newSet = newSet.difference(intervalSet);
    intervalSet = intervalSet.union(newSet);
  }
  return intervalSet.size;
}
