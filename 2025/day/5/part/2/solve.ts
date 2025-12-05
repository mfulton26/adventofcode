import Interval from "@lib/Interval.ts";
import IntervalSet from "@lib/IntervalSet.ts";
import { parseIngredientsDatabase } from "../../ingredients.ts";

export default function solve(input: string) {
  const { freshIdRanges } = parseIngredientsDatabase(input);
  return new IntervalSet(freshIdRanges.map(Interval.from)).size;
}
