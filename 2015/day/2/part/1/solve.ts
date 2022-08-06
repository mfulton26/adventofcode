export default function solve(input: string) {
  const dimensionsList = input.split("\n")
    .map((line) => line.split("x").map(Number));
  let total = 0;
  for (const dimensions of dimensionsList) {
    const [a, b, c] = dimensions.sort((a, b) => a - b);
    total += 3 * a * b + 2 * b * c + 2 * c * a;
  }
  return total;
}
