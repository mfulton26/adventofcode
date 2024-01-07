import { parseGrid } from "../../grid.ts";
import origin from "../../origin.ts";

export default function solve(input: string) {
  const { map, height } = parseGrid(input);
  let atRestCount = 0;
  falling:
  while (!map.has(`${origin}`)) {
    for (let [x, y] = origin;; y++) {
      if (y === height + 1) {
        map.set(`${x},${y + 1}`, "#");
        map.set(`${x - 1},${y + 1}`, "#");
        map.set(`${x + 1},${y + 1}`, "#");
      }
      if (!map.has(`${x},${y + 1}`)) {
        continue;
      }
      if (!map.has(`${x - 1},${y + 1}`)) {
        x--;
        continue;
      }
      if (!map.has(`${x + 1},${y + 1}`)) {
        x++;
        continue;
      }
      map.set(`${x},${y}`, "o");
      atRestCount++;
      continue falling;
    }
  }
  return atRestCount;
}
