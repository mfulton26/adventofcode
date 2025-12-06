import { parseDatabase } from "../../ingredients.ts";

export default function solve(input: string) {
  const { freshIdRanges, availableIds } = parseDatabase(input);
  const { length: freshCount } = availableIds.filter((id) =>
    freshIdRanges.some(({ start, end }) => id >= start && id <= end)
  );
  return freshCount;
}
