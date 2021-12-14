const IteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(
    Object.getPrototypeOf((function* () {})()[Symbol.iterator]())
  )
);

export default IteratorPrototype;
