/**
 * @template T
 * @template R
 * @param {(accumulator: R, value: T) => R} fn
 * @param {R} accumulator
 * @returns {(iterable: Iterable<T>) => R}
 */
export default function iterableReducer(fn, accumulator) {
  return function (iterable) {
    return reduceIterable(iterable, fn, accumulator);
  };
}

/**
 * @template T
 * @template R
 * @param {Iterable<T>} iterable
 * @param {(accumulator: R, value: T) => R} fn
 * @param {R} accumulator
 * @returns {R}
 */
export function reduceIterable(iterable, fn, accumulator) {
  for (const value of iterable) {
    accumulator = fn(accumulator, value);
  }
  return accumulator;
}
