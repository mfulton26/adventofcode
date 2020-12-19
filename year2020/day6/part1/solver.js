export function solve(input) {
  const yesesByGroup = input
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => Array.from(line)));
  let count = 0;
  for (const yeses of yesesByGroup) {
    count += new Set(yeses.flat()).size;
  }
  return count;
}
