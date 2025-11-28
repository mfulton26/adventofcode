import { program } from "../../../9/intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const panels = paintPanels(program(memory));
  return panels.size;
}

export function paintPanels(outputs: ReturnType<typeof program>) {
  const result = new Map<string, number>();
  let x = 0, y = 0, dx = 0, dy = -1;
  const paintingRobot = outputs((function* () {
    while (true) yield result.get(`${x},${y}`) ?? 0;
  })());
  for (const paintColor of paintingRobot) {
    const turnDirection = paintingRobot.next().value ? 1 : -1;
    result.set(`${x},${y}`, paintColor);
    [dx, dy] = [dy * turnDirection, -dx * turnDirection];
    x += dx, y += dy;
  }
  return result;
}
