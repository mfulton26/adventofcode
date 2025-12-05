export default class Interval {
  static of(value: number) {
    return new Interval(value, value);
  }

  static from([lower, upper]: [number, number]) {
    return new Interval(lower, upper);
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

  includes(value: number) {
    return value >= this.#lower && value <= this.#upper;
  }

  contains(other: Interval) {
    return this.#lower <= other.#lower && this.#upper >= other.#upper;
  }

  intersects(other: Interval) {
    return this.#lower <= other.#upper && other.#lower <= this.#upper;
  }

  gapTo(other: Interval) {
    if (this.#upper < other.#lower) return other.#lower - this.#upper - 1;
    if (other.#upper < this.#lower) return other.#upper - this.#lower + 1;
    return 0;
  }
}
