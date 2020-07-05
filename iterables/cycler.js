/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {Generator<T, never>}
 */
export function* cycleIterable(iterable) {
  while (true) {
    yield* iterable;
  }
}
