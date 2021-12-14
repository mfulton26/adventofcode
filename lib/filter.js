import IteratorPrototype from "./IteratorPrototype.js";

const filter = Symbol();

Object.defineProperty(IteratorPrototype, filter, {
  *value(predicate) {
    for (const value of this) if (predicate(value)) yield value;
  },
});

export default filter;
