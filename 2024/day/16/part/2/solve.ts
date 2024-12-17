import { BinaryHeap } from "@std/data-structures/binary-heap";

export default function solve(input: string) {
  const map = input.split("\n").map((line) => [...line]);
  const y0 = map.findLastIndex((row) => row.includes("S")),
    x0 = map[y0].indexOf("S");
  type XY = `${number},${number}`;
  type Tiles = ReadonlySet<XY>;
  type Node = Record<"x" | "y" | "dx" | "dy" | "$", number> & { tiles: Tiles };
  const queue = new BinaryHeap<Node>(({ $: a }, { $: b }) => a - b);
  const initTiles: Tiles = new Set<XY>().add(`${x0},${y0}`);
  queue.push({ x: x0, y: y0, dx: 1, dy: 0, $: 0, tiles: initTiles });
  const seen = new Map<`${XY},${XY}`, number>();
  let min$ = Infinity;
  const allTiles = new Set<XY>();
  while (queue.length) {
    const { x, y, dx, dy, $, tiles } = queue.pop()!;
    const hash = `${x},${y},${dx},${dy}` as const;
    if ((seen.get(hash) ?? Infinity) < $) continue;
    seen.set(hash, $);
    if (map[y][x] === "E") {
      for (const tile of tiles) allTiles.add(tile);
      allTiles.add(`${x},${y}`);
      if ($ < min$) min$ = $;
      if ($ > min$) return allTiles.size;
    }
    if (map[y + dy]?.[x + dx] !== "#") {
      const newTiles = new Set(tiles).add(`${x},${y}`);
      queue.push({ x: x + dx, y: y + dy, dx, dy, $: $ + 1, tiles: newTiles });
    }
    for (const [ndx, ndy] of [[-dy, dx], [dy, -dx]]) {
      if (map[y + ndy]?.[x + ndx] !== "#") {
        queue.push({ x: x, y: y, dx: ndx, dy: ndy, $: $ + 1000, tiles });
      }
    }
  }
}
