const isSubsetOf = Symbol();

Object.defineProperty(Set.prototype, isSubsetOf, {
  value(iterable) {
    const that = iterable instanceof Set ? iterable : new Set(iterable);
    for (const value of this) if (!that.has(value)) return false;
    return true;
  },
});

export default isSubsetOf;
