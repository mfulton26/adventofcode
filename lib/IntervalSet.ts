import Interval from "./Interval.ts";

export default class IntervalSet {
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

  has(interval: Interval) {
    return this.#intervals.some((existing) => existing.contains(interval));
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

  intersection(other: IntervalSet) {
    const result = new IntervalSet();
    for (
      let i = 0, j = 0;
      i < this.#intervals.length && j < other.#intervals.length;
      this.#intervals[i].upper < other.#intervals[j].upper
        ? i++
        : other.#intervals[j].upper < this.#intervals[i].upper
        ? j++
        : (i++, j++)
    ) {
      if (!this.#intervals[i].intersects(other.#intervals[j])) continue;
      result.#intervals.push(
        new Interval(
          Math.max(this.#intervals[i].lower, other.#intervals[j].lower),
          Math.min(this.#intervals[i].upper, other.#intervals[j].upper),
        ),
      );
    }
    return result;
  }
}
