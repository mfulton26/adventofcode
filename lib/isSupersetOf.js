const isSupersetOf = Symbol();

Object.defineProperty(Set.prototype, isSupersetOf, {
  value(iterable) {
    for (const value of iterable) if (!this.has(value)) return false;
    return true;
  },
});

export default isSupersetOf;
