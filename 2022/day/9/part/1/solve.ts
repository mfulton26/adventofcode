import CoordinateVector from "../../CoordinateVector.ts";
import { parseMotions } from "../../motionsParser.ts";
import { Set } from "immutable";

export default function solve(input: string) {
  let headPosition = CoordinateVector();
  let tailPosition = CoordinateVector();
  const visited = Set.of(tailPosition).asMutable();
  for (const { direction, amount } of parseMotions(input)) {
    for (let n = 0; n < amount; n++) {
      const previousHeadPosition = headPosition;
      headPosition = CoordinateVector({
        x: headPosition.x + direction.x,
        y: headPosition.y + direction.y,
      });
      const diffPosition = CoordinateVector({
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
