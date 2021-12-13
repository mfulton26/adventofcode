const isDisjointFrom = Symbol();

Object.defineProperty(Set.prototype, isDisjointFrom, {
  value(iterable) {
    for (const value of iterable) if (this.has(value)) return false;
    return true;
  },
});

export default isDisjointFrom;
