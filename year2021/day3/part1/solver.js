export function solve(input) {
  const bitArrays = parseBitArrays(input);
  const bitCounts = findBitCounts(bitArrays);
  const gammaRate = BitArray.from(bitCounts, (counts) =>
    counts[1] >= counts[0] ? 1 : 0
  ).toNumber();
  const epsilonRate = BitArray.from(bitCounts, (counts) =>
    counts[0] <= counts[1] ? 0 : 1
  ).toNumber();
  return gammaRate * epsilonRate;
}

function parseBitArrays(text) {
  return text.split("\n").map((line) => BitArray.from(line, Number));
}

function findBitCounts(bitArrays) {
  return bitArrays.reduce(
    (counts, bits) => (
      bits.forEach((bit, index) => counts[index][bit]++), counts
    ),
    Array.from(bitArrays[0], () => [0, 0])
  );
}

class BitArray extends Array {
  toNumber() {
    return Number(`0b${this.join("")}`);
  }
}
