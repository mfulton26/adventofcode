import Range from "./Range.ts";

export default class RangeSet {
  #ranges: Range[] = [];

  constructor(entries?: Iterable<Range>) {
    if (entries) { for (const range of entries) this.add(range); }
  }

  get size() {
    return this.#ranges.reduce((sum, range) => sum + range.length, 0);
  }

  [Symbol.iterator]() {
    return this.#ranges[Symbol.iterator]();
  }

  #findFirstWhere(predicate: (range: Range) => boolean) {
    let left = 0, right = this.#ranges.length;
    while (left < right) {
      const middle = Math.floor((left + right) / 2);
      if (predicate(this.#ranges[middle])) {
        right = middle;
      } else {
        left = middle + 1;
      }
    }
    return left;
  }

  has(value: number) {
    let left = 0, right = this.#ranges.length - 1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      const range = this.#ranges[middle];
      if (range.end <= value) {
        left = middle + 1;
      } else if (range.start > value) {
        right = middle - 1;
      } else {
        return true;
      }
    }
    return false;
  }

  add(range: Range) {
    const start = this.#findFirstWhere((r) => r.end >= range.start);
    let end = start;
    while (
      end < this.#ranges.length &&
      this.#ranges[end].start <= range.end
    ) {
      end++;
    }
    if (start === end) {
      this.#ranges.splice(start, 0, range);
    } else {
      const mergedRange = new Range(
        Math.min(range.start, this.#ranges[start].start),
        Math.max(range.end, this.#ranges[end - 1].end),
      );
      this.#ranges.splice(start, end - start, mergedRange);
    }
    return this;
  }

  delete(range: Range) {
    const start = this.#findFirstWhere((r) => r.end > range.start);
    let end = start;
    while (
      end < this.#ranges.length &&
      this.#ranges[end].start < range.end
    ) {
      end++;
    }
    if (start === end) return false;
    const newRanges: Range[] = [];
    const first = this.#ranges[start];
    if (first.start < range.start) {
      newRanges.push(new Range(first.start, range.start));
    }
    const last = this.#ranges[end - 1];
    if (last.end > range.end) {
      newRanges.push(new Range(range.end, last.end));
    }
    this.#ranges.splice(start, end - start, ...newRanges);
    return true;
  }

  difference(other: RangeSet) {
    const result = new RangeSet();
    result.#ranges = [...this.#ranges];
    for (const range of other) result.delete(range);
    return result;
  }

  union(other: RangeSet) {
    const result = new RangeSet();
    result.#ranges = [...this.#ranges];
    for (const range of other) result.add(range);
    return result;
  }

  intersection(other: RangeSet) {
    const result = new RangeSet();
    for (
      let i = 0, j = 0;
      i < this.#ranges.length && j < other.#ranges.length;
      this.#ranges[i].end < other.#ranges[j].end
        ? i++
        : other.#ranges[j].end < this.#ranges[i].end
        ? j++
        : (i++, j++)
    ) {
      if (!this.#ranges[i].intersects(other.#ranges[j])) continue;
      result.#ranges.push(
        new Range(
          Math.max(this.#ranges[i].start, other.#ranges[j].start),
          Math.min(this.#ranges[i].end, other.#ranges[j].end),
        ),
      );
    }
    return result;
  }
}
