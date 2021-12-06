const update = Symbol();

Object.defineProperty(Map.prototype, update, {
  value(key, fn) {
    return this.set(key, fn(this.get(key)));
  },
});

export default update;
