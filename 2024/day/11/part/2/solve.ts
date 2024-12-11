export default function solve(input: string, { blinks = 75 } = {}) {
  const stones = input.split(" ").map(Number);
  let count = 0;
  for (const stone of stones) count += getChangedStonesCount(stone, blinks);
  return count;
}

function blink(stone: number) {
  if (stone === 0) return [1];
  const stringified = `${stone}`;
  if (stringified.length % 2 === 0) {
    const midLength = stringified.length / 2;
    const left = +stringified.substring(0, midLength);
    const right = +stringified.substring(midLength);
    return [left, right];
  }
  return [stone * 2024];
}

function getChangedStonesCount(
  stone: number,
  blinks: number,
  cache = new Map<string, number>(),
) {
  if (blinks === 0) return 1;
  const hash = `${stone},${blinks}`;
  if (cache.has(hash)) return cache.get(hash)!;
  let result = 0;
  for (const changed of blink(stone)) {
    result += getChangedStonesCount(changed, blinks - 1, cache);
  }
  cache.set(hash, result);
  return result;
}
