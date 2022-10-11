export default function solve(input: string) {
  return input.split("\n").map(Number).reduce((sum, change) => sum + change, 0);
}
