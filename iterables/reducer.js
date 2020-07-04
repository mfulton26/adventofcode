/**
 * @param {(accumulator: R, value: T) => R} fn
 * @param {R} accumulator
 * @template T
 * @template R
 */
export default function iterableReducer(fn, accumulator) {
  return function (/** @type {Iterable<T>} */ iterable) {
    return reduceIterable(iterable, fn, accumulator);
  };
}

/**
 * @param {Iterable<T>} iterable
 * @param {(accumulator: R, value: T) => R} fn
 * @param {R} accumulator
 * @template T
 * @template R
 */
export function reduceIterable(iterable, fn, accumulator) {
  for (const value of iterable) {
    accumulator = fn(accumulator, value);
  }
  return accumulator;
}
