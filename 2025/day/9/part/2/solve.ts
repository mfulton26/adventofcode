import { parseTiles } from "../tiles.ts";

export default function solve(input: string) {
  const tiles = parseTiles(input);
  const lines = tiles.map((end, i) => ({ start: tiles.at(i - 1)!, end }));
  let result = -Infinity;
  for (const a of tiles) {
    for (const b of tiles) {
      const min = { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y) };
      const max = { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y) };
      const intersects = lines.some(({ start, end }) => {
        if (start.x === end.x) {
          if (start.x <= min.x || start.x >= max.x) return false;
          return Math.max(start.y, end.y) > min.y &&
            Math.min(start.y, end.y) < max.y;
        }
        if (start.y <= min.y || start.y >= max.y) return false;
        return Math.max(start.x, end.x) > min.x &&
          Math.min(start.x, end.x) < max.x;
      });
      if (intersects) continue;
      const area = (max.x - min.x + 1) * (max.y - min.y + 1);
      if (area > result) result = area;
    }
  }
  return result;
}
