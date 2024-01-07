import directions from "../../directions.ts";
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
  const { length: height, 0: { length: width } } = tiles;
  const pixels = Array.from(
    { length: height * 3 },
    () => Array.from({ length: width * 3 }),
    () => false,
  );
  for (const { x, y } of positions) {
    pixels[y * 3 + 1][x * 3 + 1] = true;
    for (const d of tiles[y][x]) {
      pixels[y * 3 + 1 - d.y][x * 3 + 1 + d.x] = true;
    }
  }
  const { length: pixelsHeight, 0: { length: pixelsWidth } } = pixels;
  const stack = [
    { x: 0, y: 0 },
    ...Array.from(
      { length: pixelsWidth - 2 },
      (_, k) => ({ x: k + 1, y: 0 }),
    ),
    { x: pixelsWidth - 1, y: 0 },
    ...Array.from(
      { length: pixelsHeight - 2 },
      (_, k) => ({ x: pixelsWidth - 1, y: k + 1 }),
    ),
    { x: pixelsWidth - 1, y: pixelsHeight - 1 },
    ...Array.from(
      { length: pixelsWidth - 2 },
      (_, k) => ({ x: pixelsWidth - 2 - k, y: pixelsHeight - 1 }),
    ),
    { x: 0, y: pixelsHeight - 1 },
    ...Array.from(
      { length: pixelsHeight - 2 },
      (_, k) => ({ x: 0, y: pixelsHeight - 2 - k }),
    ),
  ];
  while (stack.length) {
    const { x, y } = stack.pop()!;
    if (pixels[y][x] === true) continue;
    pixels[y][x] = true;
    stack.push(
      ...directions.map((d) => ({ x: x + d.x, y: y - d.y }))
        .filter(({ x, y }) =>
          x >= 0 && x < pixelsWidth && y >= 0 && y < pixelsHeight
        ),
    );
  }
  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[y * 3 + 1][x * 3 + 1]) continue;
      count++;
    }
  }
  return count;
}
