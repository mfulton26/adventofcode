import type { Position } from "./model.d.ts";

import intern from "../../../lib/intern.ts";
import HeightMap from "./HeightMap.ts";

export function parseInput(text: string) {
  let originPosition: Position | undefined;
  let targetPosition: Position | undefined;
  const heightMap = new HeightMap();
  text.split("\n").map((line, y) =>
    Array.from(line).forEach((char, x) => {
      const position = intern<Position>([x, y]);
      switch (char) {
        case "S":
          originPosition = position;
          heightMap.set(position, 0);
          break;
        case "E":
          targetPosition = intern<Position>([x, y]);
          heightMap.set(position, 25);
          break;
        default:
          heightMap.set(position, parseInt(char, 36) - 10);
          break;
      }
    })
  );
  if (originPosition === undefined) {
    throw new SyntaxError("origin position not found");
  }
  if (targetPosition === undefined) {
    throw new SyntaxError("target position not found");
  }
  return { originPosition, targetPosition, heightMap };
}
