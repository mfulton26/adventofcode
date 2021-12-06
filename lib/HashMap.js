export default class HashMap extends Map {
  constructor(entries) {
    super(entries);
  }

  delete(key) {
    return super.delete(JSON.stringify(key));
  }

  forEach(callbackfn, thisArg) {
    return super.forEach(
      ({ key, value }, _hashCode, map) => callbackfn(value, key, map),
      thisArg
    );
  }

  get(key) {
    return super.get(JSON.stringify(key))?.value;
  }

  has(key) {
    return super.has(JSON.stringify(key));
  }

  set(key, value) {
    return super.set(JSON.stringify(key), { key, value });
  }

  [Symbol.iterator] = this.entries;

  *entries() {
    for (const { key, value } of super.values()) yield [key, value];
  }

  *keys() {
    for (const { key } of super.values()) yield key;
  }

  *values() {
    for (const { value } of super.values()) yield value;
  }

  get [Symbol.toStringTag]() {
    return "HashMap";
  }
}
