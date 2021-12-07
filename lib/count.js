import IteratorPrototype from "./IteratorPrototype.js";

const count = Symbol();

Object.defineProperty(Array.prototype, count, {
  value(predicate) {
    let result = 0;
    for (const value of this) if (predicate(value)) result++;
    return result;
  },
});

Object.defineProperty(IteratorPrototype, count, {
  value(predicate) {
    let result = 0;
    for (const value of this) if (predicate(value)) result++;
    return result;
  },
});

export default count;
