import { program } from "../../../../intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  let blockCount = 0;
  const chunks: number[] = [];
  for (const output of program(memory)([])) {
    chunks.push(output);
    if (chunks.length < 3) continue;
    const [x, y, tileId] = chunks.splice(0, 3);
    if (tileId === 2) blockCount++;
  }
  return blockCount;
}
