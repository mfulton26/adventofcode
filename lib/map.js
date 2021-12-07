import IteratorPrototype from "./IteratorPrototype.js";

const map = Symbol();

Object.defineProperty(IteratorPrototype, map, {
  *value(transform) {
    for (const value of this) yield transform(value);
  },
});

export default map;
