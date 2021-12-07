const map = Symbol();

Object.defineProperty(
  Object.getPrototypeOf(Object.getPrototypeOf((function* () {})())),
  map,
  {
    *value(transform) {
      for (const value of this) yield transform(value);
    },
  }
);

export default map;
