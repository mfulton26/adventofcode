import { parse } from "../../tiles.ts";

export default function solve(input: string) {
  const { tiles, start } = parse(input);
  const visited = new Set().add(tiles[start.y][start.x]);
  const positions = [start];
  for (const { x, y } of positions) {
    const pipe = tiles[y][x]!;
    for (const d of pipe) {
      const position = { x: x + d.x, y: y - d.y };
      const pipe = tiles[position.y][position.x];
      if (visited.has(pipe)) continue;
      positions.push(position);
    }
    visited.add(pipe);
  }
  return (positions.length - 1) / 2;
}
