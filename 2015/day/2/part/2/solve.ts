export default function solve(input: string) {
  let total = 0;
  for (const line of input.split("\n")) {
    const dimensions = line.split("x").map(Number);
    const [a, b, c] = dimensions.sort((a, b) => a - b);
    total += a + a + b + b + a * b * c;
  }
  return total;
}
