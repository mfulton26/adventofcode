const find = Symbol();

const descriptor = {
  value(predicate) {
    for (const value of this) if (predicate(value)) return value;
  },
};

Object.defineProperty(Array.prototype, find, descriptor);

Object.defineProperty(Set.prototype, find, descriptor);

export default find;
