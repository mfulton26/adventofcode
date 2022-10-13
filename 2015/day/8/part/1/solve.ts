export default function solve(input: string) {
  return input.split("\n").reduce(
    (sum, line) =>
      sum +
      line.length -
      line.replaceAll(/\\\\|\\"|\\x[0-9a-f]{2}/g, "_").length +
      2,
    0,
  );
}
