const min = Symbol();

Object.defineProperty(Array.prototype, min, {
  value() {
    let result = Infinity;
    for (const value of this) if (value < result) result = value;
    return result;
  },
});

Object.defineProperty(
  Object.getPrototypeOf(Object.getPrototypeOf((function* () {})())),
  min,
  {
    value() {
      let result = Infinity;
      for (const value of this) if (value < result) result = value;
      return result;
    },
  }
);

export default min;
