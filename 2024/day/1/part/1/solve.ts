export default function solve(input: string) {
  const { 0: left = [], 1: right = [] } = Object.groupBy(
    input.split(/\s+/).map(Number),
    (_, index) => index % 2,
  );
  left.sort((a, b) => a - b), right.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < left.length; i++) sum += Math.abs(left[i] - right[i]);
  return sum;
}
