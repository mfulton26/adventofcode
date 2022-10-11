export default function solve(input: string) {
  const numbers = JSON.stringify(JSON.parse(input), solve.replacer)
    .match(/-?\d+/g)?.map(Number) ?? [];
  return numbers.reduce((sum, number) => sum + number, 0);
}

solve.replacer = (_: string, value: NonNullable<unknown>) =>
  value.constructor === Object && Object.values(value).includes("red")
    ? {}
    : value;
