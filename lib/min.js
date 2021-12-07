import IteratorPrototype from "./IteratorPrototype.js";

const min = Symbol();

Object.defineProperty(Array.prototype, min, {
  value() {
    let result = Infinity;
    for (const value of this) if (value < result) result = value;
    return result;
  },
});

Object.defineProperty(IteratorPrototype, min, {
  value() {
    let result = Infinity;
    for (const value of this) if (value < result) result = value;
    return result;
  },
});

export default min;
