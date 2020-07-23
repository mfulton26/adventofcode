/**
 * @template T
 * @param {Iterable<T>} iterable
 * @param {(value: T) => unknown} predicate
 * @returns {Iterable<T>}
 */
export function* filter(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) {
      yield value;
    }
  }
}
