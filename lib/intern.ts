// deno-lint-ignore-file ban-types

const internedWeakRefs = new Map<unknown, WeakRef<object>>();
const finalizationRegistry = new FinalizationRegistry((heldValue) =>
  internedWeakRefs.delete(heldValue)
);

type JSONValue = JSONObject | JSONArray | JSONPrimitive;
type JSONObject = { [key: string | number]: JSONValue; [key: symbol]: never };
type JSONArray = readonly JSONValue[];
type JSONPrimitive = string | number | boolean | null;

/**
 * Return the specified value or a previously interned value if its JSON string
 * representation is the same.
 *
 * Hopefully this can be deprecated one day in favor of
 * [Records & Tuples](https://github.com/tc39/proposal-record-tuple).
 *
 * @see https://en.wikipedia.org/wiki/Interning_(computer_science)
 * @param value the value to intern
 * @returns `value` if no existing value matches, otherwise the existing value
 */
export default function intern<T extends JSONObject | JSONArray>(value: T): T {
  const id = JSON.stringify(value);
  const internedValue = internedWeakRefs.get(id)?.deref();
  if (internedValue !== undefined) return internedValue as T;
  internedWeakRefs.set(id, new WeakRef(value));
  finalizationRegistry.register(value, id);
  return value;
}
