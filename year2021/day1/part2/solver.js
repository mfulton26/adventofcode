export function solve(input) {
  return parseDepths(input)
    [windowed](3)
    .map((window) => window[sum]())
    [windowed](2)
    [count](([a, b]) => b > a);
}

function parseDepths(text) {
  return text.split("\n").map(Number);
}

const count = Symbol();
const sum = Symbol();
const windowed = Symbol();

Object.defineProperties(Array.prototype, {
  [count]: {
    value(predicate) {
      let result = 0;
      for (const value of this) if (predicate(value)) result++;
      return result;
    },
  },
  [sum]: {
    value() {
      let sum = 0;
      for (const value of this) sum += value;
      return sum;
    },
  },
  [windowed]: {
    value(size) {
      return Array.from({ length: this.length - (size - 1) }, (_, start) =>
        this.slice(start, start + size)
      );
    },
  },
});
