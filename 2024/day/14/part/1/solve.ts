import mod from "../../../../../lib/mod.ts";

const regExp = /^p=(?<px>\d+),(?<py>\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)$/gm;

export default function solve(
  input: string,
  { width = 101, height = 103, t = 100 } = {},
) {
  const robots = input.matchAll(regExp).map((match) => match.map(Number))
    .map(([, px, py, vx, vy]) => ({ px, py, vx, vy })).toArray();
  const mid = { x: (width - 1) / 2, y: (height - 1) / 2 };
  const quadrantCounts = [0, 0, 0, 0];
  for (const { px, py, vx, vy } of robots) {
    const fx = mod(px + t * vx, width), fy = mod(py + t * vy, height);
    if (fx === mid.x || fy === mid.y) continue;
    quadrantCounts[(fy < mid.y ? 0 : 2) + (fx < mid.x ? 0 : 1)]++;
  }
  return quadrantCounts.reduce((product, count) => product * count, 1);
}
