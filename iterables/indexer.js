/**
 * @template T
 * @template K
 */
export default function iterableIndexer(/** @type {(value: T) => K} */ fn) {
  return function (/** @type {Iterable<T>} */ iterable) {
    return indexIterable(iterable, fn);
  };
}

/**
 * @param {Iterable<T>} iterable
 * @param {(value: T) => K} fn
 * @template T
 * @template K
 */
export function indexIterable(iterable, fn) {
  /** @type {Map<K, T[]>} */
  const map = new Map();
  for (const value of iterable) {
    const key = fn(value);
    const values = map.get(key);
    if (values === undefined) {
      map.set(key, [value]);
    } else {
      values.push(value);
    }
  }
  return map;
}
