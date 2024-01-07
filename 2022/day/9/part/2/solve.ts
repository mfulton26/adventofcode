import intern from "../../../../../lib/intern.ts";
import { parseMotions } from "../../motionsParser.ts";

const knotCount = 10;

export default function solve(input: string) {
  const knotX = Array.from({ length: knotCount }, () => 0);
  const knotY = Array.from({ length: knotCount }, () => 0);
  const visited = new Set([intern([0, 0])]);
  for (const { direction: [dx, dy], amount } of parseMotions(input)) {
    for (let n = 0; n < amount; n++) {
      [knotX[0], knotY[0]] = [knotX[0] + dx, knotY[0] + dy];
      for (let h = 0, i = 1; i < knotCount; h++, i++) {
        const [diffX, diffY] = [knotX[h] - knotX[i], knotY[h] - knotY[i]];
        if (Math.abs(diffX) < 2 && Math.abs(diffY) < 2) break;
        const [signX, signY] = [Math.sign(diffX), Math.sign(diffY)];
        [knotX[i], knotY[i]] = [knotX[i] + signX, knotY[i] + signY];
      }
      visited.add(intern([knotX[knotCount - 1], knotY[knotCount - 1]]));
    }
  }
  return visited.size;
}
