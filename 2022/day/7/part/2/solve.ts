import { parseFromTerminalOutput } from "../../filesystem.ts";

export default function solve(input: string) {
  const { root } = parseFromTerminalOutput(input);
  const unusedSpace = 70000000 - root.size;
  const spaceNeeded = 30000000 - unusedSpace;
  let result = Infinity;
  for (const { size } of root.dirIterator()) {
    if (size < spaceNeeded || size >= result) continue;
    result = size;
  }
  return result;
}
