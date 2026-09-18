export default function solve(input: string) {
  const ranges = input.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });
  ranges.sort((a, b) => a.start - b.start || a.end - b.end);
  let value = 0;
  for (const range of ranges) {
    if (range.start > value) break;
    value = Math.max(value, range.end + 1);
  }
  return value;
}
