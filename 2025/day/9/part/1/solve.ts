import { parseTiles } from "../tiles.ts";

export default function solve(input: string) {
  const tiles = parseTiles(input);
  let result = -Infinity;
  for (const a of tiles) {
    for (const b of tiles) {
      const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
      if (area > result) result = area;
    }
  }
  return result;
}
