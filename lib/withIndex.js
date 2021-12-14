const withIndex = Symbol();

const descriptor = {
  value() {
    return this.map((value, index) => [index, value]);
  },
};

Object.defineProperty(Array.prototype, withIndex, descriptor);

export default withIndex;
