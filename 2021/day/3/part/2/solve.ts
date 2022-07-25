export default function solve(input: string) {
  const bitArrays = input.trim().split("\n").map((line) =>
    Array.from(line, Number)
  );
  const oxygenGeneratorRating = findRating(
    bitArrays,
    (counts) => counts[1] >= counts[0] ? 1 : 0,
  );
  const carbonDioxideScrubberRating = findRating(
    bitArrays,
    (counts) => counts[0] <= counts[1] ? 0 : 1,
  );
  return oxygenGeneratorRating * carbonDioxideScrubberRating;
}

function findBitCounts(bitArrays: number[][]) {
  return bitArrays.reduce(
    (counts, bits) => (
      bits.forEach((bit, index) => counts[index][bit]++), counts
    ),
    Array.from(bitArrays[0], () => [0, 0]),
  );
}

function findRating(
  bitArrays: number[][],
  bitCriteria: (counts: number[]) => 0 | 1,
) {
  for (let index = 0; bitArrays.length > 1; index++) {
    const bitCounts = findBitCounts(bitArrays);
    const target = bitCriteria(bitCounts[index]);
    bitArrays = bitArrays.filter((bits) => bits[index] === target);
  }
  return Number(`0b${bitArrays[0].join("")}`);
}
