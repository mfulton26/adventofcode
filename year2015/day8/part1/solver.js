export function solve(input) {
  return input
    .split("\n")
    .reduce(
      (sum, line) =>
        sum +
        line.length -
        line.replace(/\\\\|\\"|\\x[0-9a-f]{2}/, "_").length +
        2,
      0
    );
}
