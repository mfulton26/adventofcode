import BitArray from "../../../lib/BitArray.js";

export function solve(input) {
  const bitArrays = parseBitArrays(input);
  const oxygenGeneratorRating = findRating(bitArrays, (counts) =>
    counts[1] >= counts[0] ? 1 : 0
  );
  const carbonDioxideScrubberRating = findRating(bitArrays, (counts) =>
    counts[0] <= counts[1] ? 0 : 1
  );
  return oxygenGeneratorRating * carbonDioxideScrubberRating;
}

function parseBitArrays(text) {
  return text.split("\n").map((line) => BitArray.from(line, Number));
}

function findRating(bitArrays, bitCriteria) {
  for (let index = 0; bitArrays.length > 1; index++) {
    const bitCounts = findBitCounts(bitArrays);
    const target = bitCriteria(bitCounts[index]);
    bitArrays = bitArrays.filter((bits) => bits[index] === target);
  }
  return bitArrays[0].toNumber();
}

function findBitCounts(bitArrays) {
  return bitArrays.reduce(
    (counts, bits) => (
      bits.forEach((bit, index) => counts[index][bit]++), counts
    ),
    Array.from(bitArrays[0], () => [0, 0])
  );
}
