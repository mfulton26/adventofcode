const chunked = Symbol();

Object.defineProperty(Array.prototype, chunked, {
  value(size) {
    return Array.from({ length: this.length - (size - 1) }, (_, start) =>
      this.slice(start, start + size)
    );
  },
});

export default chunked;
