export default function solve(input: string) {
  let total = 0;
  for (const line of input.split("\n")) {
    const dimensions = line.split("x").map(Number);
    const [a, b, c] = dimensions.sort((a, b) => a - b);
    total += 3 * a * b + 2 * b * c + 2 * c * a;
  }
  return total;
}
