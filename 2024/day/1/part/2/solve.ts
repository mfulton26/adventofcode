export default function solve(input: string) {
  const { 0: left = [], 1: right = [] } = Object.groupBy(
    input.split(/\s+/).map(Number),
    (_, index) => index % 2,
  );
  const counts = new Map<number, number>();
  for (const value of right) counts.set(value, (counts.get(value) ?? 0) + 1);
  let sum = 0;
  for (const value of left) sum += value * (counts.get(value) ?? 0);
  return sum;
}
