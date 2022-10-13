export default function solve(input: string) {
  const adapters = input.split("\n").map(Number).sort((a, b) => a - b);
  let count = 1;
  const counts = new Map([[0, count]]);
  for (const adapter of adapters) {
    count = (counts.get(adapter - 3) ?? 0) +
      (counts.get(adapter - 2) ?? 0) +
      (counts.get(adapter - 1) ?? 0);
    counts.set(adapter, count);
  }
  return count;
}
