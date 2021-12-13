const toInt = Symbol();

Object.defineProperty(String.prototype, toInt, {
  value(radix) {
    return parseInt(this, radix);
  },
});

export default toInt;
