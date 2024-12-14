const regExp =
  /^Button A: X\+(?<ax>\d+), Y\+(?<ay>\d+)$\n^Button B: X\+(?<bx>\d+), Y\+(?<by>\d+)$\n^Prize: X=(?<px>\d+), Y=(?<py>\d+)$/gm;

export default function solve(input: string, { offset = 10000000000000 } = {}) {
  const configs = input.matchAll(regExp).map((array) => array.map(Number))
    .map(([, ax, ay, bx, by, px, py]) => ({ ax, ay, bx, by, px, py }))
    .toArray();
  for (const config of configs) config.px += offset, config.py += offset;
  let tokens = 0;
  for (const { ax, ay, bx, by, px, py } of configs) {
    const d = ax * by - bx * ay;
    const at = (px * by - py * bx) / d, bt = (py * ax - px * ay) / d;
    if (Number.isInteger(at) && Number.isInteger(bt)) tokens += 3 * at + bt;
  }
  return tokens;
}
