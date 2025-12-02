export default function solve(input: string) {
  const ranges = input.split(",").map((line) => line.split("-").map(Number));
  let sum = 0;
  for (const [firstId, lastId] of ranges) {
    const firstIdLength = Math.floor(Math.log10(firstId) + 1);
    const divisor = 10 ** Math.ceil(firstIdLength / 2);
    const lower = Math.floor(firstId / divisor);
    const upper = Math.floor(lastId / divisor);
    for (let digits = lower; digits <= upper; digits++) {
      const id = +`${digits}${digits}`;
      if (id < firstId) continue;
      if (id > lastId) break;
      sum += id;
    }
  }
  return sum;
}
