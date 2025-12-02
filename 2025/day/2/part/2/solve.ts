export default function solve(input: string) {
  const ranges = input.split(",").map((line) => line.split("-").map(Number));
  let sum = 0;
  for (const [firstId, lastId] of ranges) {
    const firstIdLength = Math.floor(Math.log10(firstId) + 1);
    const lastIdLength = Math.ceil(Math.log10(lastId) + 1);
    const seen = new Set<number>();
    for (let repeatCount = 2; repeatCount <= lastIdLength; repeatCount++) {
      const divisor = 10 **
        Math.ceil(firstIdLength * (repeatCount - 1) / repeatCount);
      const lower = Math.floor(firstId / divisor);
      const upper = Math.floor(lastId / divisor);
      for (let digits = lower; digits <= upper; digits++) {
        const id = +`${digits}`.repeat(repeatCount);
        if (id < firstId) continue;
        if (id > lastId) break;
        if (seen.has(id)) continue;
        seen.add(id);
        sum += id;
      }
    }
  }
  return sum;
}
