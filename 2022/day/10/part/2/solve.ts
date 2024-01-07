import { parseInstructions } from "../../instructions.ts";

export default function solve(input: string) {
  const instructions = parseInstructions(input);
  let cycle = 1;
  let x = 1;
  let position = 0;
  let pixels = "";
  for (const instruction of instructions) {
    for (
      let n = 0;
      n < instruction.cycles;
      n++, cycle++, position++, position %= 40
    ) {
      if (position === 0 && cycle !== 1) pixels += "\n";
      pixels += (position >= x - 1 && position <= x + 1) ? "#" : ".";
    }
    x = instruction.next(x);
  }
  return pixels;
}
