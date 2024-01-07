import { type DirInfo, parseFromTerminalOutput } from "../../filesystem.ts";

export default function solve(input: string) {
  const { root } = parseFromTerminalOutput(input);
  const unusedSpace = 70000000 - root.size;
  const spaceNeeded = 30000000 - unusedSpace;
  const deletionCandidates: DirInfo[] = [];
  for (const dir of root.dirIterator()) {
    if (dir.size < spaceNeeded) continue;
    deletionCandidates.push(dir);
  }
  const [deletionTarget] = deletionCandidates
    .sort(({ size: a }, { size: b }) => a - b);
  return deletionTarget.size;
}
