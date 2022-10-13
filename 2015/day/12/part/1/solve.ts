export default function solve(input: string) {
  const numbers = input.match(/-?\d+/g)?.map(Number) ?? [];
  return numbers.reduce((sum, number) => sum + number, 0);
}
