import { parseDatabase } from "../../ingredients.ts";

export default function solve(input: string) {
  const { freshIdRanges } = parseDatabase(input);
  freshIdRanges.sort((a, b) => a.start - b.start);
  const merged: typeof freshIdRanges = [];
  for (const { start, end } of freshIdRanges) {
    const prevRange = merged.at(-1);
    if (prevRange && start <= prevRange.end + 1) {
      prevRange.end = Math.max(prevRange.end, end);
    } else {
      merged.push({ start, end });
    }
  }
  return merged.reduce((sum, { start, end }) => sum + (end - start + 1), 0);
}
