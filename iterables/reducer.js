/**
 * @template T
 * @template R
 * @param {(accumulator: R, value: T) => R} fn
 * @param {R} accumulator
 * @returns {(iterable: Iterable<T>) => R}
 */
export default function reducer(fn, accumulator) {
  return function (iterable) {
    return reduce(iterable, fn, accumulator);
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
export function reduce(iterable, fn, accumulator) {
  for (const value of iterable) {
    accumulator = fn(accumulator, value);
  }
  return accumulator;
}
