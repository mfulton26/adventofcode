/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {T | undefined}
 */
export function findLast(iterable) {
  let value;
  for (const element of iterable) {
    value = element;
  }
  return value;
}
