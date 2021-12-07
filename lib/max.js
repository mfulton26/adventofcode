const max = Symbol();

Object.defineProperty(Array.prototype, max, {
  value() {
    let result = -Infinity;
    for (const value of this) if (value > result) result = value;
    return result;
  },
});

export default max;
