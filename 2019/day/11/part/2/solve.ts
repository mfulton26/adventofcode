import { program } from "../../../9/intcode.ts";


export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const panels = paintPanels(program(memory));
  for (const [key, value] of panels) if (value === 0) panels.delete(key);
  return stringify(panels);
}

export function paintPanels(outputs: ReturnType<typeof program>) {
  const result = new Map<string, number>();
  let x = 0, y = 0, dx = 0, dy = -1;
  const paintingRobot = outputs((function* () {
    while (true) yield result.get(`${x},${y}`) ?? (x == 0 && y == 0 ? 1 : 0);
  })());
  for (const paintColor of paintingRobot) {
    const turnDirection = paintingRobot.next().value ? 1 : -1;
    result.set(`${x},${y}`, paintColor);
    [dx, dy] = [-dy * turnDirection, dx * turnDirection];
    x += dx, y += dy;
  }
  return result;
}

function stringify(hashedCoordinates: Pick<Set<string>, "has" | >) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const coordinates of hashedCoordinates.keys()) {
    const [x, y] = coordinates.split(",").map(Number);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  let output = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      output += hashedCoordinates.has(`${x},${y}`) ? "#" : ".";
    }
    output += "\n";
  }
  return output;
}