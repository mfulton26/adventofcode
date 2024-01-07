// deno-lint-ignore-file ban-types

const internedWeakRefs = new Map<unknown, WeakRef<object>>();
const finalizationRegistry = new FinalizationRegistry((heldValue) =>
  internedWeakRefs.delete(heldValue)
);

/**
 * Return the specified value or a previously interned value if its JSON string
 * representation is the same.
 * @see [Interning (computer science) - Wikipedia](https://en.wikipedia.org/wiki/Interning_(computer_science))
 * @param value the value to intern
 * @returns `value` if no existing value matches, otherwise the existing value
 */
export default function intern<T extends object>(value: T): T {
  const id = JSON.stringify(value);
  const internedValue = internedWeakRefs.get(id)?.deref();
  if (internedValue !== undefined) return internedValue as T;
  internedWeakRefs.set(id, new WeakRef(value));
  finalizationRegistry.register(value, id);
  return value;
}
