export default function solve(input: string) {
  const ages = input.trim().split(",").map(Number);
  const timers = Array<number>(9).fill(0);
  for (const age of ages) timers[age]++;
  for (let n = 0; n < 80; n++) {
    const resetCount = timers.shift()!;
    timers[6] += resetCount;
    timers[8] = resetCount;
  }
  return timers.reduce((sum, n) => sum + n, 0);
}
