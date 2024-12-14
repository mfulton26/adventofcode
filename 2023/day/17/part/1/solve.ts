import { BinaryHeap } from "@std/data-structures/binary-heap";

type Vector = { x: number; y: number };
type Direction = Vector & { c: number };
type Node = Vector & { d: Direction; heatLoss: number };

export default function solve(input: string) {
  const blocks = input.split("\n").map((line) => Array.from(line, Number));
  const heatLosses = blocks.map((row) =>
    row.map(() => new Map<string, number>())
  );
  const heap = new BinaryHeap<Node>(
    ({ heatLoss: a }, { heatLoss: b }) => a - b,
  );
  heap.push({ x: 0, y: 0, d: { x: 0, y: -1, c: 0 }, heatLoss: 0 });
  heap.push({ x: 0, y: 0, d: { x: 1, y: 0, c: 0 }, heatLoss: 0 });
  for (const { x, y, d, heatLoss } of heap.drain()) {
    const directions = [{ x: -d.y, y: d.x, c: 1 }, { x: d.y, y: -d.x, c: 1 }];
    if (d.c < 3) directions.push({ ...d, c: d.c + 1 });
    for (const d of directions) {
      const n = { x: x + d.x, y: y - d.y, d, heatLoss };
      n.heatLoss += blocks[n.y]?.[n.x];
      if (Number.isNaN(n.heatLoss)) continue;
      const hash = JSON.stringify(d);
      if (n.heatLoss >= (heatLosses[n.y][n.x].get(hash) ?? Infinity)) continue;
      heatLosses[n.y][n.x].set(hash, n.heatLoss);
      heap.push(n);
    }
  }
  return Math.min(...heatLosses.at(-1)!.at(-1)!.values());
}
