const difference = Symbol();

Object.defineProperty(Set.prototype, difference, {
  value(...sets) {
    const result = new Set(this);
    for (const set of sets) for (const value of set) result.delete(value);
    return result;
  },
});

export default difference;
