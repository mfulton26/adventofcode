const pipe = Symbol();

Object.defineProperty(Object.prototype, pipe, {
  value(fn) {
    return fn(this);
  },
});

export default pipe;
