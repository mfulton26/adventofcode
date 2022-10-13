/**
 * Generator function for iterating through all permutations of an iterable.
 *
 * This is an implementation of the Plain Changes algorithm for permutations generation described in Knuth's "The Art of Computer Programming", Volume 4, Chapter 7, Section 7.2.1.2.
 *
 * Adapted from https://github.com/google/guava/blob/f4b3f611c4e49ecaded58dcb49262f55e56a3322/guava/src/com/google/common/collect/Collections2.java#L622-L683
 */
export default function* permute<T>(iterable: Iterable<T>) {
  const array = Array.from(iterable);
  if (array.length <= 1) {
    yield array;
  } else {
    const c = Array(array.length).fill(0);
    const o = Array(array.length).fill(1);
    let j = Infinity;
    while (j > 0) {
      yield array.slice();
      j = array.length - 1;
      let s = 0;
      while (true) {
        const q = c[j] + o[j];
        if (q < 0) {
          o[j] = -o[j];
          j--;
        } else if (q === j + 1) {
          if (j === 0) {
            break;
          }
          s++;
          o[j] = -o[j];
          j--;
        } else {
          const a = j - c[j] + s;
          const b = j - q + s;
          [array[a], array[b]] = [array[b], array[a]];
          c[j] = q;
          break;
        }
      }
    }
  }
}
