const sorted = Symbol();

Object.defineProperty(String.prototype, sorted, {
  value() {
    return Array.from(this).sort().join("");
  },
});

export default sorted;
