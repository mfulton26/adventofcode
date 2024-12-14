import { BinaryHeap } from "@std/data-structures/binary-heap";

const directions = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

export default function solve(input: string, { steps = 64 } = {}) {
  const map = input.split("\n");
  const y = map.findIndex((row) => row.includes("S"));
  const x = map[y].indexOf("S");
  const heap = new BinaryHeap<{ x: number; y: number; step: number }>(
    ({ step: a }, { step: b }) => a - b,
  );
  heap.push({ x, y, step: 0 });
  const distances = new Map<number, Map<number, number>>();
  for (const { x, y, step } of heap.drain()) {
    if (map[y][x] === "#" || step > steps) continue;
    if (!distances.has(y)) distances.set(y, new Map());
    const row = distances.get(y)!;
    if (step >= (row.get(x) ?? Infinity)) continue;
    row.set(x, step);
    for (const d of directions) {
      heap.push({ x: x + d.x, y: y - d.y, step: step + 1 });
    }
  }
  // console.log(
  //   map.map(
  //     (row, y) =>
  //       Array.from(
  //         row,
  //         (s, x) =>
  //           s === "#" ? "#" : (distances.get(y)?.has(x) &&
  //               (distances.get(y)!.get(x)! % 2 === 0))
  //             ? "O"
  //             : ".",
  //       ).join(""),
  //   ).join("\n"),
  // );
  let count = 0;
  for (const row of distances.values()) {
    for (const distance of row.values()) {
      if (distance % 2 !== 0) continue;
      count++;
    }
  }
  return count;
}
