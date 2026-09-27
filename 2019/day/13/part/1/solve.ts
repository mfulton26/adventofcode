import { createProgram } from "../../../9/intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const program = createProgram(memory);
  let blockCount = 0;
  const outputs: number[] = [];
  for (const output of program()) {
    outputs.push(output);
    if (outputs.length < 3) continue;
    const [, , tileId] = outputs;
    outputs.length = 0;
    if (tileId !== 2) continue;
    blockCount++;
  }
  return blockCount;
}
