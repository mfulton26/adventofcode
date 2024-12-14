import { BinaryHeap } from "std/data_structures/binary_heap.ts";

import mod from "../../../../../lib/mod.ts";

const directions = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

function _solve(input: string, { steps = 26501365 } = {}) {
  const map = input.split("\n");
  const { length: height, 0: { length: width } } = map;
  const y = map.findIndex((row) => row.includes("S"));
  const x = map[y].indexOf("S");
  const heap = new BinaryHeap<{ x: number; y: number; step: number }>(
    ({ step: a }, { step: b }) => a - b,
  );
  heap.push({ x, y, step: 0 });
  const distances = new Map<number, Map<number, number>>();
  for (const { x, y, step } of heap.drain()) {
    if (map[mod(y, height)][mod(x, width)] === "#" || step > steps) continue;
    if (!distances.has(y)) distances.set(y, new Map());
    const row = distances.get(y)!;
    if (step >= (row.get(x) ?? Infinity)) continue;
    row.set(x, step);
    for (const d of directions) {
      heap.push({ x: x + d.x, y: y - d.y, step: step + 1 });
    }
  }
  let count = 0;
  for (const row of distances.values()) {
    for (const distance of row.values()) {
      if (distance % 2 !== steps % 2) continue;
      count++;
    }
  }
  return count;
}

/**
 * Lagrange's Interpolation formula for ax^2 + bx + c with x=[0,1,2] and y=[y0,y1,y2] we have
 *   f(x) = (x^2-3x+2) * y0/2 - (x^2-2x)*y1 + (x^2-x) * y2/2
 * so the coefficients are:
 * a = y0/2 - y1 + y2/2
 * b = -3*y0/2 + 2*y1 - y2/2
 * c = y0
 *
 * @see https://pastebin.com/d0tD8Uwx
 */
function simplifiedLagrange([a, b, c]: number[]) {
  return { a: a / 2 - b + c / 2, b: -3 * (a / 2) + 2 * b - c / 2, c: a };
}

export default function solve(input: string, { steps = 26501365 } = {}) {
  const map = input.split("\n");
  const { length: sideLength } = map;
  const halfSidLength = Math.trunc(sideLength / 2);
  const values = [
    _solve(input, { steps: halfSidLength }),
    _solve(input, { steps: halfSidLength + sideLength }),
    _solve(input, { steps: halfSidLength + sideLength * 2 }),
  ];
  const { a, b, c } = simplifiedLagrange(values);
  const target = (steps - halfSidLength) / sideLength;
  return a * target ** 2 + b * target + c;
}
