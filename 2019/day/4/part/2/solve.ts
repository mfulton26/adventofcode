export default function solve(input: string) {
  const [start, end] = input.split("-").map(Number);
  let count = 0;
  for (let n = start; n <= end; n++) {
    const s = String(n);
    if (
      s.length === 6 &&
      /(\d)\1/.test(s) &&
      s === Array.from(s).sort().join("") &&
      s.match(/(\d)\1+/g)?.some(({ length }) => length === 2)
    ) {
      count++;
    }
  }
  return count;
}
