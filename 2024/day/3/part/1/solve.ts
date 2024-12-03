export default function solve(input: string) {
  let sum = 0;
  for (const { groups } of input.matchAll(/mul\((?<a>\d+),(?<b>\d+)\)/g)) {
    const { a, b } = groups!;
    sum += +a * +b;
  }
  return sum;
}
