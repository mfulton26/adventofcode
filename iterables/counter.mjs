/**
 * @param {Iterable<*>} iterable
 * @returns {number}
 */
export function count(iterable) {
  let count = 0;
  for (const _ of iterable) {
    count++;
  }
  return count;
}
