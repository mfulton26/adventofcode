import RangeSet from "@lib/RangeSet.ts";
import { parseIngredientsDatabase } from "../../ingredients.ts";

export default function solve(input: string) {
  const { freshIdRanges, availableIds } = parseIngredientsDatabase(input);
  const rangeSet = new RangeSet(freshIdRanges);
  let freshCount = 0;
  for (const availableId of availableIds) {
    if (rangeSet.has(availableId)) freshCount++;
  }
  return freshCount;
}
