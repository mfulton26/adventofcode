export default function solve(input: string) {
  const weights = input.split("\n").map(Number).sort((a, b) => b - a);
  const sum = weights.reduce(add, 0);
  const targetWeight = sum / 3;
  const minSize = 1 + weights.findIndex(summingToAtLeast(targetWeight));
  const maxSize = 1 + weights.findLastIndex(summingToAtLeast(targetWeight));
  for (let size = minSize; size <= maxSize; size++) {
    const possibilities = [...combinations(weights, size)]
      .filter((combination) => combination.reduce(add, 0) === targetWeight)
      .map((weights) => ({ weights, product: weights.reduce(mul, 1) }))
      .sort(({ product: a }, { product: b }) => a - b);
    if (possibilities.length === 0) continue;
    const [{ product }] = possibilities;
    return product;
  }
}

function add(a: number, b: number) {
  return a + b;
}

function mul(a: number, b: number) {
  return a * b;
}

function summingToAtLeast(limit: number) {
  let sum = 0;
  return (value: number) => (sum += value) >= limit;
}

function* combinations<T>(values: Iterable<T>, size: number) {
  const byIndex = new Map(Array.from(values, (v, k) => [k, v]));
  for (
    let bits = (2 ** size) - 1, firstSetBit = 0, bitToFlip = -1;
    bitToFlip !== byIndex.size;
    firstSetBit = nextSetBit(bits, 0),
      bitToFlip = nextClearBit(bits, firstSetBit),
      bits = setBits(bits, 0, bitToFlip - firstSetBit - 1),
      bits = clearBits(bits, bitToFlip - firstSetBit - 1, bitToFlip),
      bits = setBit(bits, bitToFlip)
  ) {
    const combination: T[] = [];
    for (
      let index = nextSetBit(bits);
      index !== -1;
      index = nextSetBit(bits, index + 1)
    ) {
      combination.push(byIndex.get(index)!);
    }
    yield combination;
  }
}

function setBit(bits: number, index: number) {
  const mask = 2 ** index;
  return bits | mask;
}

function setBits(bits: number, fromIndex: number, toIndex: number) {
  const mask = ((2 ** toIndex) - 1) ^ ((2 ** fromIndex) - 1);
  return bits | mask;
}

function clearBits(bits: number, fromIndex: number, toIndex: number) {
  const mask = ((2 ** toIndex) - 1) ^ ((2 ** fromIndex) - 1);
  return (bits | mask) ^ mask;
}

function nextSetBit(bits: number, fromIndex = 0) {
  for (
    let index = fromIndex, mask = 2 ** index;
    mask < bits;
    index++, mask <<= 1
  ) {
    if (bits & mask) return index;
  }
  return -1;
}

function nextClearBit(bits: number, fromIndex = 0) {
  for (
    let index = fromIndex, mask = 2 ** index;;
    index++, mask <<= 1
  ) {
    if (bits & mask) continue;
    return index;
  }
}
