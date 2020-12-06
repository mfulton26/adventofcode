export function solve(input) {
  const yesesByGroup = input
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => new Set(line)));
  let count = 0;
  for (const yeses of yesesByGroup) {
    count += yeses.reduce((intersection, set) => intersect(intersection, set))
      .size;
  }
  return count;
}

function intersect(a, b) {
  return new Set(Array.from(a).filter((value) => b.has(value)));
}
