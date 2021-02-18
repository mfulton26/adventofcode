/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {Generator<T, never>}
 */
export function* cycle(iterable) {
  while (true) {
    yield* iterable;
  }
}
