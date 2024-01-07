import { parseInput } from "../../input.ts";

export default function solve(input: string) {
  const { startingStacks: stacks, rearrangementProcedures } = parseInput(input);
  for (const { quantity, source, destination } of rearrangementProcedures) {
    stacks.get(destination)!.push(...stacks.get(source)!.splice(-quantity));
  }
  return Array.from(stacks.values(), (crates) => crates.at(-1)).join("");
}
