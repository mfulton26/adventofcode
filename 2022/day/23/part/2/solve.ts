import intern from "@lib/intern.ts";

type Point = { x: number; y: number };

const North = intern({ x: 0, y: -1 });
const South = intern({ x: 0, y: 1 });
const West = intern({ x: -1, y: 0 });
const East = intern({ x: 1, y: 0 });
const Northeast = intern({ x: 1, y: -1 });
const Northwest = intern({ x: -1, y: -1 });
const Southeast = intern({ x: 1, y: 1 });
const Southwest = intern({ x: -1, y: 1 });
const adjacentDirections = Object.freeze([
  North,
  South,
  West,
  East,
  Northeast,
  Northwest,
  Southeast,
  Southwest,
]);

function parseElves(text: string) {
  const result = new Set<Point>();
  for (const [y, line] of text.split("\n").entries()) {
    for (const [x, char] of Array.from(line).entries()) {
      if (char === "#") result.add(intern({ x, y }));
    }
  }
  return result;
}

export default function solve(input: string) {
  const elves = parseElves(input);
  const directions = [North, South, West, East];
  for (let round = 1;; round++, directions.push(directions.shift()!)) {
    const proposals = new Map<Point, Set<Point>>();
    for (const elf of elves) {
      const adjacencyByDirection = adjacentDirections.reduce(
        (a, d) => a.set(d, intern({ x: elf.x + d.x, y: elf.y + d.y })),
        new Map<Point, Point>(),
      );
      if (adjacencyByDirection.values().every((p) => !elves.has(p))) continue;
      const d = directions.find((d) =>
        [d, { x: d.x || 1, y: d.y || 1 }, { x: d.x || -1, y: d.y || -1 }]
          .every((d) => !elves.has(adjacencyByDirection.get(intern(d))!))
      );
      if (!d) continue;
      const point = intern({ x: elf.x + d.x, y: elf.y + d.y });
      proposals.get(point)?.add(elf) ?? proposals.set(point, new Set([elf]));
    }
    if (proposals.size === 0) return round;
    for (const [point, proposed] of proposals) {
      if (proposed.size > 1) continue;
      const [elf] = proposed;
      elves.delete(elf);
      elves.add(point);
    }
  }
}
