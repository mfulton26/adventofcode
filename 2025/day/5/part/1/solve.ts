import Interval from "@lib/Interval.ts";
import IntervalSet from "@lib/IntervalSet.ts";
import { parseIngredientsDatabase } from "../../ingredients.ts";

export default function solve(input: string) {
  const { freshIdRanges, availableIds } = parseIngredientsDatabase(input);
  const intervalSet = new IntervalSet(freshIdRanges.map(Interval.from));
  let freshCount = 0;
  for (const availableId of availableIds) {
    if (intervalSet.has(Interval.of(availableId))) freshCount++;
  }
  return freshCount;
}
