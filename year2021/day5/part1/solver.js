import HashMap from "../../../lib/HashMap.js";

export function solve(input) {
  const segments = parseLineSegments(input);
  const grid = new HashMap();
  for (const [[x1, y1], [x2, y2]] of segments) {
    if (x1 !== x2 && y1 !== y2) continue;
    const [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
    const steps = Math.abs(x2 - x1) || Math.abs(y2 - y1);
    for (let step = 0, x = x1, y = y1; step <= steps; step++, x += dx, y += dy)
      grid[update]([x, y], (count = 0) => count + 1);
  }
  return grid.values()[count]((value) => value > 1);
}

function parseLineSegments(text) {
  return text
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((side) => side.split(",").map(Number))
    );
}

const update = Symbol();
Object.defineProperty(Map.prototype, update, {
  value(key, fn) {
    return this.set(key, fn(this.get(key)));
  },
});

const count = Symbol();
Object.defineProperty(
  Object.getPrototypeOf(Object.getPrototypeOf((function* () {})())),
  count,
  {
    value(predicate) {
      let result = 0;
      for (const value of this) if (predicate(value)) result++;
      return result;
    },
  }
);
