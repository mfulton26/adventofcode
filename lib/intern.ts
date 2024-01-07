// deno-lint-ignore-file ban-types

const internedWeakRefs = new Map<unknown, WeakRef<object>>();
const finalizationRegistry = new FinalizationRegistry((heldValue) =>
  internedWeakRefs.delete(heldValue)
);

export default function intern<T extends object>(value: T): T {
  const id = JSON.stringify(value);
  const internedValue = internedWeakRefs.get(id)?.deref();
  if (internedValue !== undefined) return internedValue as T;
  internedWeakRefs.set(id, new WeakRef(value));
  finalizationRegistry.register(value, id);
  return value;
}
