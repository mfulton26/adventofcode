export default function solve(input: string) {
  const ages = input.split(",").map(Number);
  const timerCounts = Array<number>(9).fill(0);
  for (const age of ages) timerCounts[age]++;
  for (let n = 0; n < 80; n++) {
    const resetCount = timerCounts.shift()!;
    timerCounts[6] += resetCount;
    timerCounts.push(resetCount);
  }
  return timerCounts.reduce((sum, n) => sum + n, 0);
}
