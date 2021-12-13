const pipe = Symbol();

Object.defineProperty(Object.prototype, pipe, {
  value(fn) {
    fn(this);
    return this;
  },
});

export default pipe;
