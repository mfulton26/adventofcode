export function solve(input) {
  input = JSON.stringify(JSON.parse(input), solve.replacer);
  const numbers = input.match(/-?\d+/g)?.map(Number) ?? [];
  return numbers.reduce((sum, number) => sum + number, 0);
}
solve.replacer = (_, value) =>
  value?.constructor === Object && Object.values(value).includes("red")
    ? {}
    : value;
