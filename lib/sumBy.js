const sumBy = Symbol();

Object.defineProperty(Array.prototype, sumBy, {
  value(selector) {
    let result = 0;
    for (const value of this) result += selector(value);
    return result;
  },
});

export default sumBy;
