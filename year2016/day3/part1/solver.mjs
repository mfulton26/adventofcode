export function solve(input) {
  const tuples = input
    .split("\n")
    .map((line) => line.match(/\d+/g).map(Number));
  // const tuples = Array.from(
  //   input.matchAll(/^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/gm),
  //   ([, a, b, c]) => [Number(a), Number(b), Number(c)]
  // );
  let count = 0;
  for (const tuple of tuples) {
    const [a, b, c] = Array.from(tuple).sort((a, b) => a - b);
    if (a + b > c) {
      count++;
    }
  }
  return count;
}
