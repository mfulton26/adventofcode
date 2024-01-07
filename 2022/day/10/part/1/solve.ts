import { parseInstructions } from "../../instructions.ts";

export default function solve(input: string) {
  const instructions = parseInstructions(input);
  let cycle = 1;
  let x = 1;
  let sum = 0;
  for (const instruction of instructions) {
    for (let n = 0; n < instruction.cycles; n++, cycle++) {
      if ((cycle % 40) !== 20) continue;
      sum += cycle * x;
    }
    x = instruction.next(x);
  }
  return sum;
}
