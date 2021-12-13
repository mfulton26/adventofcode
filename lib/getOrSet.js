const getOrSet = Symbol();

Object.defineProperty(Map.prototype, getOrSet, {
  value(key, value) {
    if (!this.has(key)) this.set(key, value);
    return this.get(key);
  },
});

export default getOrSet;
