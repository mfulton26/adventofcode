function setBit(bits: bigint, index: number) {
  return bits | (1n << BigInt(index));
}

function clearBit(bits: bigint, index: number) {
  return bits & ~(1n << BigInt(index));
}

function setBits(bits: bigint, fromIndex: number, toIndex: number) {
  return bits |
    (((1n << BigInt(toIndex)) - 1n) & ~((1n << BigInt(fromIndex)) - 1n));
}

function clearBits(bits: bigint, fromIndex: number, toIndex: number) {
  return bits &
    ~(((1n << BigInt(toIndex)) - 1n) & ~((1n << BigInt(fromIndex)) - 1n));
}

function indexOfNextSetBit(bits: bigint, fromIndex?: number) {
  const bitLength = bits === 0n ? 0 : bits.toString(2).length;
  for (let index = fromIndex ?? 0; index < bitLength; index++) {
    if ((bits >> BigInt(index) & 1n) !== 1n) continue;
    return index;
  }
  return -1;
}

function indexOfNextClearBit(bits: bigint, fromIndex: number) {
  for (let index = fromIndex;; index++) {
    if ((bits >> BigInt(index) & 1n) === 1n) continue;
    return index;
  }
}

/**
 * Generator function for iterating through all subsets of a `Set` of specified `size`.
 *
 * Adapted from [guava/Sets.java](https://github.com/google/guava/blob/27c54b01e9ea567ab6fc35d111c459a6676eaa09/guava/src/com/google/common/collect/Sets.java#L1635-L1758).
 */
export default function* combinations<T>(set: Set<T>, size: number) {
  let bits = 0n;
  while (true) {
    if (bits === 0n) {
      bits = (1n << BigInt(size)) - 1n;
    } else {
      const firstSetBit = indexOfNextSetBit(bits, 0);
      const bitToFlip = indexOfNextClearBit(bits, firstSetBit);
      if (bitToFlip === set.size) return;
      /*
       * The current set in sorted order looks like
       * {firstSetBit, firstSetBit + 1, ..., bitToFlip - 1, ...}
       * where it does *not* contain bitToFlip.
       *
       * The next combination is
       *
       * {0, 1, ..., bitToFlip - firstSetBit - 2, bitToFlip, ...}
       *
       * This is lexicographically next if you look at the combinations in descending order
       * e.g. {2, 1, 0}, {3, 1, 0}, {3, 2, 0}, {3, 2, 1}, {4, 1, 0}...
       */
      bits = setBits(bits, 0, bitToFlip - firstSetBit - 1);
      bits = clearBits(bits, bitToFlip - firstSetBit - 1, bitToFlip);
      bits = setBit(bits, bitToFlip);
    }
    const combination = new Set<T>();
    let mask = 1n;
    for (const value of set) {
      if (bits & mask) combination.add(value);
      mask <<= 1n;
    }
    yield combination;
  }
}
