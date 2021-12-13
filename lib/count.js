import IteratorPrototype from "./IteratorPrototype.js";

const count = Symbol();

const descriptor = {
  value(predicate) {
    let result = 0;
    for (const value of this) if (predicate(value)) result++;
    return result;
  },
};

Object.defineProperty(Array.prototype, count, descriptor);
Object.defineProperty(IteratorPrototype, count, descriptor);
Object.defineProperty(String.prototype, count, descriptor);
Object.defineProperty(Set.prototype, count, descriptor);
Object.defineProperty(Map.prototype, count, descriptor);

export default count;
