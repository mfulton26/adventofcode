const union = Symbol();

Object.defineProperty(Set, union, {
  value(...sets) {
    const result = new Set();
    for (const set of sets) for (const value of set) result.add(value);
    return result;
  },
});

Object.defineProperty(Set.prototype, union, {
  value(...sets) {
    return Set[union](this, ...sets);
  },
});

export default union;
