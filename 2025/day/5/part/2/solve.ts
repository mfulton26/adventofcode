import RangeSet from "@lib/RangeSet.ts";
import { parseIngredientsDatabase } from "../../ingredients.ts";

export default function solve(input: string) {
  const { freshIdRanges } = parseIngredientsDatabase(input);
  return new RangeSet(freshIdRanges).size;
}
