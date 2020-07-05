/**
 * @template T
 * @template K
 * @param {(value: T) => K} fn
 * @returns {(iterable: Iterable<T>) => Map<K, T[]>}
 */
export default function iterableIndexer(fn) {
  return function (iterable) {
    return indexIterable(iterable, fn);
  };
}

/**
 * @template T
 * @template K
 * @param {Iterable<T>} iterable
 * @param {(value: T) => K} fn
 * @returns {Map<K, T[]>}
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
