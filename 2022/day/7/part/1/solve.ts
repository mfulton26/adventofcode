import { parseFromTerminalOutput } from "../../filesystem.ts";

export default function solve(input: string) {
  const { root } = parseFromTerminalOutput(input);
  let result = 0;
  for (const dir of root.dirIterator()) {
    if (dir.size > 100000) continue;
    result += dir.size;
  }
  return result;
}
