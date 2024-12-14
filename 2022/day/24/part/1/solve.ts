import type { Grid, ReadonlyGrid } from "../../grid.ts";

import lcm from "../../../../../lib/lcm.ts";
import mod from "../../../../../lib/mod.ts";

const charToDirection = {
  "^": { x: 0, y: -1 },
  "v": { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
  ">": { x: 1, y: 0 },
};

function parseGrid(text: string): ReadonlyGrid {
  return text.split("\n").map((line) =>
    Array.from(line, (char) => new Set(char === "." ? [] : [char]))
  );
}

function calculateGrid(initialGrid: ReadonlyGrid, step: number): ReadonlyGrid {
  const { length: height, 0: { length: width } } = initialGrid;
  const result = structuredClone(initialGrid) as Grid;
  for (const row of result) {
    for (const chars of row) {
      for (const directionChar of Object.keys(charToDirection)) {
        chars.delete(directionChar);
      }
    }
  }
  for (const [y, row] of initialGrid.entries()) {
    for (const [x, chars] of row.entries()) {
      for (const char of chars) {
        if (!(char in charToDirection)) continue;
        const d = charToDirection[char as keyof typeof charToDirection];
        const nx = mod(x + step * d.x - 1, width - 2) + 1;
        const ny = mod(y + step * d.y - 1, height - 2) + 1;
        result[ny][nx].add(char);
      }
    }
  }
  return result;
}

export default function solve(input: string) {
  const initialGrid = parseGrid(input);
  getGrid.cache = new Map<number, ReadonlyGrid>();
  function getGrid(step: number) {
    const key = step % lcm(width, height);
    const cachedGrid = getGrid.cache.get(key);
    if (cachedGrid) return cachedGrid;
    const result = calculateGrid(initialGrid, step);
    getGrid.cache.set(key, result);
    return result;
  }
  const { length: height, 0: { length: width } } = initialGrid;
  const goal = { x: width - 2, y: height - 1 };
  const queue = [{ x: 1, y: 0, step: 0 }];
  const seen = new Set<string>();
  while (queue.length) {
    const prev = queue.shift()!;
    const prevHash = JSON.stringify(prev);
    if (seen.has(prevHash)) continue;
    seen.add(prevHash);
    const grid = getGrid(prev.step + 1);
    if (prev.x === goal.x && prev.y === goal.y) return prev.step;
    for (const d of Object.values(charToDirection)) {
      const x = prev.x + d.x, y = prev.y + d.y;
      if (y < 0 || y >= height || grid[y][x].size) continue;
      queue.push({ x, y, step: prev.step + 1 });
    }
    if (grid[prev.y][prev.x].size) continue;
    queue.push({ ...prev, step: prev.step + 1 });
  }
}
