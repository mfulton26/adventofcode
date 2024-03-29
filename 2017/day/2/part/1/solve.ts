export default function solve(input: string) {
  const table = input.split("\n").map((line) => line.split(/\s/).map(Number));
  return table.reduce(
    (sum, values) => sum + Math.max(...values) - Math.min(...values),
    0,
  );
}
