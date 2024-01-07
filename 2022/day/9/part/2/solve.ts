import CoordinateVector from "../../CoordinateVector.ts";
import { parseMotions } from "../../motionsParser.ts";
import { Set } from "immutable";

export default function solve(input: string) {
  const knotPositions = Array.from({ length: 10 }, () => CoordinateVector());
  const visited = Set.of(knotPositions[knotPositions.length - 1]).asMutable();
  for (const { direction, amount } of parseMotions(input)) {
    for (let n = 0; n < amount; n++) {
      knotPositions[0] = CoordinateVector({
        x: knotPositions[0].x + direction.x,
        y: knotPositions[0].y + direction.y,
      });
      for (let i = 1; i < knotPositions.length; i++) {
        const diffPosition = CoordinateVector({
          x: knotPositions[i - 1].x - knotPositions[i].x,
          y: knotPositions[i - 1].y - knotPositions[i].y,
        });
        if (Math.abs(diffPosition.x) < 2 && Math.abs(diffPosition.y) < 2) break;
        knotPositions[i] = CoordinateVector({
          x: knotPositions[i].x + Math.sign(diffPosition.x),
          y: knotPositions[i].y + Math.sign(diffPosition.y),
        });
      }
      visited.add(knotPositions[knotPositions.length - 1]);
    }
  }
  return visited.size;
}
