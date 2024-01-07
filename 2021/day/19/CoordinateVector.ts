const weakRefsByHeldValues = new Map<unknown, WeakRef<readonly number[]>>();
const finalizationRegistry = new FinalizationRegistry((heldValue) =>
  weakRefsByHeldValues.delete(heldValue)
);

export default function CoordinateVector<T extends readonly number[]>(
  ...coordinates: T
): Readonly<T> {
  const heldValue = `${coordinates}`;
  const interned = weakRefsByHeldValues.get(heldValue)?.deref();
  if (interned !== undefined) return interned as Readonly<T>;
  const value = Object.freeze(coordinates);
  weakRefsByHeldValues.set(heldValue, new WeakRef(value));
  finalizationRegistry.register(value, heldValue);
  return value;
}
