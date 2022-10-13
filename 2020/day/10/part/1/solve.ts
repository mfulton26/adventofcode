export default function solve(input: string) {
  const adapters = input.split("\n").map(Number).sort((a, b) => a - b);
  const differences: Record<number, number> = { 1: 0, 2: 0, 3: 1 };
  for (let i = 0; i < adapters.length; i++) {
    differences[adapters[i] - (adapters[i - 1] ?? 0)]++;
  }
  return differences[1] * differences[3];
}
