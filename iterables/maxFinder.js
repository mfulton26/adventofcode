/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {T=}
 */
export function findMax(iterable) {
  const iterator = iterable[Symbol.iterator]();
  let { value, done } = iterator.next();
  if (done) {
    return undefined;
  }
  let max = value;
  for (
    { value, done } = iterator.next();
    !done;
    { value, done } = iterator.next()
  ) {
    if (value > max) {
      max = value;
    }
  }
  return max;
}
