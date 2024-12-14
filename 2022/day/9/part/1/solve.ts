import intern from "@lib/intern.ts";
import { parseMotions } from "../../motionsParser.ts";

export default function solve(input: string) {
  let [headX, headY] = [0, 0];
  let [tailX, tailY] = [0, 0];
  const visited = new Set([intern([0, 0])]);
  for (const { direction: [dx, dy], amount } of parseMotions(input)) {
    for (let n = 0; n < amount; n++) {
      const [previousHeadX, previousHeadY] = [headX, headY];
      [headX, headY] = [headX + dx, headY + dy];
      const [diffX, diffY] = [headX - tailX, headY - tailY];
      if (Math.abs(diffX) < 2 && Math.abs(diffY) < 2) continue;
      [tailX, tailY] = [previousHeadX, previousHeadY];
      visited.add(intern([tailX, tailY]));
    }
  }
  return visited.size;
}
