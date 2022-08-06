export default function solve(input: string) {
  const dimensionsList = input.split("\n")
    .map((line) => line.split("x").map(Number));
  let total = 0;
  for (const dimensions of dimensionsList) {
    const [a, b, c] = dimensions.sort((a, b) => a - b);
    total += a + a + b + b + a * b * c;
  }
  return total;
}
