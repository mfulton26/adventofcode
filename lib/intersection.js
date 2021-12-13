const intersection = Symbol();

Object.defineProperty(Set, intersection, {
  value(...sets) {
    const result = new Set();
    const smallestSet = sets.reduce((a, b) => (a.size < b.size ? a : b));
    for (const value of smallestSet)
      if (sets.every((set) => set.has(value))) result.add(value);
    return result;
  },
});

Object.defineProperty(Set.prototype, intersection, {
  value(...sets) {
    return Set[intersection](this, ...sets);
  },
});

export default intersection;
