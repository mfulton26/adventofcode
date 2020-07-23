/**
 * @template T
 * @param {Iterable<Iterable<T>>} iterables
 * @returns {Iterable<T>}
 */
export function* flatten(iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
