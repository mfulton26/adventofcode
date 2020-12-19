export function solve(input) {
  let total = 0;
  for (const line of input.split("\n")) {
    const [a, b, c] = line
      .split("x")
      .map(Number)
      .sort((a, b) => a - b);
    total += 3 * a * b + 2 * b * c + 2 * c * a;
  }
  return total;
}
