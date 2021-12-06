const sum = Symbol();

Object.defineProperty(Array.prototype, sum, {
  value() {
    let result = 0;
    for (const value of this) result += value;
    return result;
  },
});

export default sum;
