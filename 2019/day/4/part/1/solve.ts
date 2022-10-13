export default function solve(input: string) {
  const [start, end] = input.split("-").map(Number);
  let count = 0;
  for (let n = start; n <= end; n++) {
    const s = `${n}`;
    if (
      s.length === 6 &&
      /(\d)\1/.test(s) &&
      s === Array.from(s).sort().join("")
    ) {
      count++;
    }
  }
  return count;
}
