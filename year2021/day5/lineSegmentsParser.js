export function parseLineSegments(text) {
  return text
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((side) => side.split(",").map(Number))
    );
}
