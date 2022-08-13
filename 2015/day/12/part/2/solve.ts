export default function solve(input: string) {
  input = JSON.stringify(
    JSON.parse(input),
    (_, value) =>
      value.constructor === Object && Object.values(value).includes("red")
        ? {}
        : value,
  );
  const numbers = input.match(/-?\d+/g)?.map(Number) ?? [];
  return numbers.reduce((sum, number) => sum + number, 0);
}
