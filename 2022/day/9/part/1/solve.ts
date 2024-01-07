import intern from "../../../../../lib/intern.ts";
import { parseMotions } from "../../motionsParser.ts";

const origin = intern({ x: 0, y: 0 });

export default function solve(input: string) {
  let headPosition = origin;
  let tailPosition = origin;
  const visited = new Set([tailPosition]);
  for (const { direction, amount } of parseMotions(input)) {
    for (let n = 0; n < amount; n++) {
      const previousHeadPosition = headPosition;
      headPosition = intern({
        x: headPosition.x + direction.x,
        y: headPosition.y + direction.y,
      });
      const diffPosition = intern({
        x: headPosition.x - tailPosition.x,
        y: headPosition.y - tailPosition.y,
      });
      if (Math.abs(diffPosition.x) < 2 && Math.abs(diffPosition.y) < 2) {
        continue;
      }
      tailPosition = previousHeadPosition;
      visited.add(tailPosition);
    }
  }
  return visited.size;
}
