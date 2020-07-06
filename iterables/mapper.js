/**
 * @template T
 * @template R
 * @param {(value: T) => R} fn
 * @returns {(iterable: Iterable<T>) => Generator<R>}
 */
export default function mapper(fn) {
  return function* (iterable) {
    yield* map(iterable, fn);
  };
}

/**
 * @template T
 * @template R
 * @param {Iterable<T>} iterable
 * @param {(value: T) => R} fn
 * @returns {Generator<R>}
 */
export function* map(iterable, fn) {
  for (const value of iterable) {
    yield fn(value);
  }
}
