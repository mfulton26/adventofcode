import { parseDevices } from "../../devices.ts";

export default function solve(input: string) {
  const devices = parseDevices(input);
  const stack = [["you"]];
  let pathCount = 0;
  while (stack.length) {
    const path = stack.pop()!;
    const end = path.at(-1)!;
    if (end === "out") pathCount++;
    else devices.get(end)?.forEach((output) => stack.push([...path, output]));
  }
  return pathCount;
}
