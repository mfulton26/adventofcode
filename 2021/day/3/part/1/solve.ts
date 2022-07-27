export default function solve(input: string) {
  const bitArrays = input.split("\n").map((line) => Array.from(line, Number));
  const bitCounts = findBitCounts(bitArrays);
  const gammaRate = findRate(
    bitCounts,
    (counts) => counts[1] >= counts[0] ? 1 : 0,
  );
  const epsilonRate = gammaRate ^ (2 ** bitCounts.length - 1);
  return gammaRate * epsilonRate;
}

function findBitCounts(bitArrays: number[][]) {
  return bitArrays.reduce(
    (counts, bits) => (
      bits.forEach((bit, index) => counts[index][bit]++), counts
    ),
    Array.from(bitArrays[0], () => [0, 0]),
  );
}

function findRate(
  bitCounts: number[][],
  bitCriteria: (counts: number[]) => 0 | 1,
) {
  return Number(`0b${Array.from(bitCounts, bitCriteria).join("")}`);
}
