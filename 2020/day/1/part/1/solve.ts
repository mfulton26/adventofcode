export default function solve(input: string) {
  const entries = input.split("\n").map(Number);
  const entrySet = new Set(entries);
  for (const a of entries) {
    const b = 2020 - a;
    if (!entrySet.has(b)) continue;
    return a * b;
  }
}
