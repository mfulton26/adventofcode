import IteratorPrototype from "./IteratorPrototype.js";

const sumBy = Symbol();

const descriptor = {
  value(selector) {
    let result = 0;
    for (const value of this) result += selector(value);
    return result;
  },
};

Object.defineProperty(Array.prototype, sumBy, descriptor);

Object.defineProperty(IteratorPrototype, sumBy, descriptor);

export default sumBy;
