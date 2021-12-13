const single = Symbol();

const descriptor = {
  value(predicate = () => true) {
    let result;
    let hasResult = false;
    for (const value of this)
      if (predicate(value))
        if (hasResult) throw new Error("multiple matches");
        else (result = value), (hasResult = true);
    if (hasResult) return result;
    throw new Error("no matches");
  },
};

Object.defineProperty(Array.prototype, single, descriptor);

Object.defineProperty(Set.prototype, single, descriptor);

export default single;
