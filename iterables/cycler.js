/** @template T @returns {Generator<T, never>} */
export function* cycleIterable(/** @type {Iterable<T>} */ iterable) {
  while (true) {
    yield* iterable;
  }
}
