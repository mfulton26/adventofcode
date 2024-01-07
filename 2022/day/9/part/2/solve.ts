import intern from "../../../../../lib/intern.ts";
import { parseMotions } from "../../motionsParser.ts";

const origin = intern({ x: 0, y: 0 });

export default function solve(input: string) {
  const knotPositions = Array.from({ length: 10 }, () => origin);
  const visited = new Set([knotPositions[knotPositions.length - 1]]);
  for (const { direction, amount } of parseMotions(input)) {
    for (let n = 0; n < amount; n++) {
      knotPositions[0] = intern({
        x: knotPositions[0].x + direction.x,
        y: knotPositions[0].y + direction.y,
      });
      for (let i = 1; i < knotPositions.length; i++) {
        const diffPosition = intern({
          x: knotPositions[i - 1].x - knotPositions[i].x,
          y: knotPositions[i - 1].y - knotPositions[i].y,
        });
        if (Math.abs(diffPosition.x) < 2 && Math.abs(diffPosition.y) < 2) {
          break;
        }
        knotPositions[i] = intern({
          x: knotPositions[i].x + Math.sign(diffPosition.x),
          y: knotPositions[i].y + Math.sign(diffPosition.y),
        });
      }
      visited.add(knotPositions[knotPositions.length - 1]);
    }
  }
  return visited.size;
}
