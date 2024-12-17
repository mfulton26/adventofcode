import { BinaryHeap } from "@std/data-structures/binary-heap";

export default function solve(input: string) {
  const map = input.split("\n").map((line) => [...line]);
  const y0 = map.findLastIndex((row) => row.includes("S")),
    x0 = map[y0].indexOf("S");
  type Node = Record<"x" | "y" | "dx" | "dy" | "$", number>;
  const queue = new BinaryHeap<Node>(({ $: a }, { $: b }) => a - b);
  queue.push({ x: x0, y: y0, dx: 1, dy: 0, $: 0 });
  const seen = new Set();
  while (queue.length) {
    const { x, y, dx, dy, $ } = queue.pop()!;
    const hash = `${x},${y},${dx},${dy}`;
    if (seen.has(hash)) continue;
    seen.add(hash);
    if (map[y][x] === "E") return $;
    if (map[y + dy]?.[x + dx] !== "#") {
      queue.push({ x: x + dx, y: y + dy, dx, dy, $: $ + 1 });
    }
    for (const [ndx, ndy] of [[-dy, dx], [dy, -dx]]) {
      if (map[y + ndy]?.[x + ndx] !== "#") {
        queue.push({ x: x, y: y, dx: ndx, dy: ndy, $: $ + 1000 });
      }
    }
  }
}
