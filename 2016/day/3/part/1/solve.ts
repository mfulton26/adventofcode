export default function solve(input: string) {
  return input.split("\n")
    .map((line) => line.trim().split(/ +/).map(Number).sort((a, b) => a - b))
    .filter(([a, b, c]) => a + b > c)
    .length;
}
