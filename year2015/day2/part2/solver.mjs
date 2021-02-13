export function solve(input) {
  let total = 0;
  for (const line of input.split("\n")) {
    const [a, b, c] = line
      .split("x")
      .map(Number)
      .sort((a, b) => a - b);
    total += a + a + b + b + a * b * c;
  }
  return total;
}
