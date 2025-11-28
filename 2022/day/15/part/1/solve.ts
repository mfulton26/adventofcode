import { parseReports } from "../../reports.ts";
import calculateManhattanDistance from "@lib/calculateManhattanDistance.ts";

class Interval {
  static of(value: number) {
    return new Interval(value, value);
  }

  readonly #lower: number;
  readonly #upper: number;

  constructor(lower: number, upper: number) {
    if (lower > upper) throw new RangeError("upper cannot be less than lower");
    this.#lower = lower;
    this.#upper = upper;
  }

  get lower() {
    return this.#lower;
  }

  get upper() {
    return this.#upper;
  }

  get length() {
    return this.#upper - this.#lower + 1;
  }

  gapTo(other: Interval) {
    if (this.#upper < other.#lower) return other.#lower - this.#upper - 1;
    if (other.#upper < this.#lower) return other.#upper - this.#lower + 1;
    return 0;
  }
}

class IntervalSet {
  #intervals: Interval[] = [];

  constructor(entries?: Iterable<Interval>) {
    if (entries) { for (const interval of entries) this.add(interval); }
  }

  get size() {
    return this.#intervals.reduce((sum, interval) => sum + interval.length, 0);
  }

  [Symbol.iterator]() {
    return this.#intervals[Symbol.iterator]();
  }

  #compareIntervalsTo(other: Interval) {
    const { [-1]: lower = [], [0]: contiguous = [], [1]: upper = [] } = Object
      .groupBy(this.#intervals, (interval) => Math.sign(other.gapTo(interval)));
    return { lower, contiguous, upper };
  }

  add(interval: Interval) {
    const { lower, contiguous, upper } = this.#compareIntervalsTo(interval);
    if (contiguous.length === 0) {
      this.#intervals = [...lower, interval, ...upper];
      return;
    }
    const mergedInterval = new Interval(
      Math.min(interval.lower, contiguous[0].lower),
      Math.max(interval.upper, contiguous[contiguous.length - 1].upper),
    );
    this.#intervals = [...lower, mergedInterval, ...upper];
  }

  delete(interval: Interval) {
    const { lower, contiguous, upper } = this.#compareIntervalsTo(interval);
    if (contiguous.length === 0) return;
    const newIntervals: Interval[] = [];
    const first = contiguous[0];
    if (first.lower < interval.lower) {
      newIntervals.push(new Interval(first.lower, interval.lower - 1));
    }
    const last = contiguous[contiguous.length - 1];
    if (last.upper > interval.upper) {
      newIntervals.push(new Interval(interval.upper + 1, last.upper));
    }
    this.#intervals = [...lower, ...newIntervals, ...upper];
  }

  difference(other: IntervalSet) {
    const result = new IntervalSet();
    result.#intervals = [...this.#intervals];
    for (const interval of other) result.delete(interval);
    return result;
  }

  union(other: IntervalSet) {
    const result = new IntervalSet();
    result.#intervals = [...this.#intervals];
    for (const interval of other) result.add(interval);
    return result;
  }
}

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
