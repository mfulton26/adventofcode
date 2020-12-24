export function solve(input) {
  return input
    .split("\n")
    .reduce(
      (sum, line) =>
        sum +
        2 +
        line.replaceAll("\\", "\\\\").replaceAll('"', '\\"').length -
        line.length,
      0
    );
}
