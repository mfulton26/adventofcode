export default function solve(input: string) {
  const yesesByGroup = input
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => new Set(line)));
  let count = 0;
  for (const yeses of yesesByGroup) {
    count += yeses.reduce((a, b) => intersect(a, b)).size;
  }
  return count;
}

function intersect<T>(a: Set<T>, b: Set<T>): Set<T> {
  if (b.size < a.size) return intersect(b, a);
  return new Set(Array.from(a).filter((value) => b.has(value)));
}
