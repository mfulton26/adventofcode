export default function solve(input: string) {
  const numbers = JSON.stringify(JSON.parse(input), solve.replacer)
    .match(/-?\d+/g)?.map(Number) ?? [];
  return numbers.reduce((sum, number) => sum + number, 0);
}
// fixme(typescript 4.8): use NonNullable<unknown> instead
// deno-lint-ignore ban-types
solve.replacer = (_: string, value: {}) =>
  value.constructor === Object && Object.values(value).includes("red")
    ? {}
    : value;
