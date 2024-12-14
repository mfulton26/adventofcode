const regExp =
  /^Button A: X\+(?<ax>\d+), Y\+(?<ay>\d+)$\n^Button B: X\+(?<bx>\d+), Y\+(?<by>\d+)$\n^Prize: X=(?<px>\d+), Y=(?<py>\d+)$/gm;

export default function solve(input: string) {
  const configs = input.matchAll(regExp).map((array) => array.map(Number))
    .map(([, ax, ay, bx, by, px, py]) => ({ ax, ay, bx, by, px, py }))
    .toArray();
  let tokens = 0;
  for (const { ax, ay, bx, by, px, py } of configs) {
    let minTokens = Infinity;
    for (let a = 0; a < 100; a++) {
      for (let b = 0; b < 100; b++) {
        const x = a * ax + b * bx, y = a * ay + b * by, $ = 3 * a + b;
        if (x === px && y === py && $ < minTokens) minTokens = $;
      }
    }
    if (minTokens !== Infinity) tokens += minTokens;
  }
  return tokens;
}
