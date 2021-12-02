export function solve(input) {
  return parseDepths(input)
    [windowed](2)
    [count](([a, b]) => b > a);
}

function parseDepths(text) {
  return text.split("\n").map(Number);
}

const count = Symbol();
const windowed = Symbol();

Object.defineProperties(Array.prototype, {
  [count]: {
    value(predicate) {
      let result = 0;
      for (const value of this) if (predicate(value)) result++;
      return result;
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
