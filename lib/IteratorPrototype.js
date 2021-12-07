const IteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf((function* () {})())
);

export default IteratorPrototype;
