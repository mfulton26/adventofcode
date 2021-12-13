const symmetricDifference = Symbol();

Object.defineProperty(Set.prototype, symmetricDifference, {
  value(...sets) {
    const result = new Set(this);
    for (const set of sets)
      for (const value of set)
        if (result.delete(value)) continue;
        else result.add(value);
    return result;
  },
});

export default symmetricDifference;
