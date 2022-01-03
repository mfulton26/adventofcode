const windowed = Symbol();

Object.defineProperty(Array.prototype, windowed, {
  value(size) {
    return Array.from({ length: this.length - (size - 1) }, (_, start) =>
      this.slice(start, start + size)
    );
  },
});

export default windowed;
