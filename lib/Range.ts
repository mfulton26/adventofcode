export default class Range {
  readonly #start: number;
  readonly #end: number;

  constructor(start: number, end: number) {
    if (start > end) throw new RangeError("end cannot be less than start");
    this.#start = start;
    this.#end = end;
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.#end;
  }

  get length() {
    return this.#end - this.#start;
  }

  includes(value: number) {
    return value >= this.#start && value < this.#end;
  }

  intersects(other: Range) {
    return this.#start < other.#end && other.#start < this.#end;
  }

  isAdjacentTo(other: Range) {
    return this.#end === other.#start || other.#end === this.#start;
  }

  distanceTo(other: Range) {
    if (this.#end < other.#start) return other.#start - this.#end;
    if (other.#end < this.#start) return this.#start - other.#end;
    return 0;
  }
}
