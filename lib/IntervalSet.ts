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

  #findFirstWhere(predicate: (interval: Interval) => boolean) {
    let left = 0, right = this.#intervals.length;
    while (left < right) {
      const middle = Math.floor((left + right) / 2);
      if (predicate(this.#intervals[middle])) {
        right = middle;
      } else {
        left = middle + 1;
      }
    }
    return left;
  }

  has(interval: Interval) {
    let left = 0, right = this.#intervals.length - 1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      const existing = this.#intervals[middle];
      if (existing.upper < interval.lower) {
        left = middle + 1;
      } else if (existing.lower > interval.upper) {
        right = middle - 1;
      } else if (existing.contains(interval)) {
        return true;
      } else if (existing.upper < interval.upper) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
    return false;
  }

  add(interval: Interval) {
    const start = this.#findFirstWhere((i) => i.upper >= interval.lower - 1);
    let end = start;
    while (
      end < this.#intervals.length &&
      this.#intervals[end].lower <= interval.upper + 1
    ) end++;
    if (start === end) {
      this.#intervals.splice(start, 0, interval);
      return;
    }
    const mergedInterval = new Interval(
      Math.min(interval.lower, this.#intervals[start].lower),
      Math.max(interval.upper, this.#intervals[end - 1].upper),
    );
    this.#intervals.splice(start, end - start, mergedInterval);
  }

  delete(interval: Interval) {
    const start = this.#findFirstWhere((i) => i.upper >= interval.lower);
    let end = start;
    while (
      end < this.#intervals.length &&
      this.#intervals[end].lower <= interval.upper
    ) end++;
    if (start === end) return;
    const newIntervals: Interval[] = [];
    const first = this.#intervals[start];
    if (first.lower < interval.lower) {
      newIntervals.push(new Interval(first.lower, interval.lower - 1));
    }
    const last = this.#intervals[end - 1];
    if (last.upper > interval.upper) {
      newIntervals.push(new Interval(interval.upper + 1, last.upper));
    }
    this.#intervals.splice(start, end - start, ...newIntervals);
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
