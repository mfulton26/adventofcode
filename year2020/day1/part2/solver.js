export function solve(input) {
  const entries = input.split("\n").map(Number);
  const entrySet = new Set(entries);
  for (let i = 0; i < entries.length; i++) {
    const a = entries[i];
    for (let j = i + 1; j < entries.length; j++) {
      const b = entries[j];
      const c = 2020 - a - b;
      if (entrySet.has(c)) {
        return a * b * c;
      }
    }
  }
}
