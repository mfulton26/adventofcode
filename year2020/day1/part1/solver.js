export function solve(input) {
  const entries = input.split("\n").map(Number);
  const entrySet = new Set(entries);
  for (const a of entries) {
    const b = 2020 - a;
    if (entrySet.has(b)) {
      return a * b;
    }
  }
}
