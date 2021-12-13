import getOrSet from "./getOrSet.js";

const groupBy = Symbol();

Object.defineProperty(Array.prototype, groupBy, {
  value(keySelector, valueTransform = (value) => value) {
    const result = new Map();
    for (const value of this)
      result[getOrSet](keySelector(value), []).push(valueTransform(value));
    return result;
  },
});

export default groupBy;
