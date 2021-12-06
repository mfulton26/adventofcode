const count = Symbol();

Object.defineProperty(Array.prototype, count, {
  value(predicate) {
    let result = 0;
    for (const value of this) if (predicate(value)) result++;
    return result;
  },
});

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

export default count;
