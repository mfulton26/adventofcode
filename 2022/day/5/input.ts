import { parseStartingStacks } from "./startStacks.ts";
import { parseRearrangementProcedures } from "./rearrangementProcedures.ts";

export function parseInput(text: string) {
  const [topText, bottomText] = text.split("\n\n");
  const startingStacks = parseStartingStacks(topText);
  const rearrangementProcedures = parseRearrangementProcedures(bottomText);
  return { startingStacks, rearrangementProcedures };
}
