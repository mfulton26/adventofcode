/**
 * @template T
 * @template R
 */
export default function iterableMapper(/** @type {(value: T) => R} */ fn) {
  return function* (/** @type {Iterable<T>} */ iterable) {
    yield* mapIterable(iterable, fn);
  };
}

/**
 * @template T
 * @template R
 */
export function* mapIterable(
  /** @type {Iterable<T>} */ iterable,
  /** @type {(value: T) => R} */ fn
) {
  for (const value of iterable) {
    yield fn(value);
  }
}
