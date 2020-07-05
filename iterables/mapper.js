/**
 * @template T
 * @template R
 * @param {(value: T) => R} fn
 * @returns {(iterable: Iterable<T>) => Generator<R>}
 */
export default function iterableMapper(fn) {
  return function* (iterable) {
    yield* mapIterable(iterable, fn);
  };
}

/**
 * @template T
 * @template R
 * @param {Iterable<T>} iterable
 * @param {(value: T) => R} fn
 * @returns {Generator<R>}
 */
export function* mapIterable(iterable, fn) {
  for (const value of iterable) {
    yield fn(value);
  }
}
