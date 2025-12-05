import Range from "@lib/Range.ts";

export function parseIngredientsDatabase(text: string) {
  const [top, bottom] = text.split("\n\n");
  const freshIdRanges = top.split("\n").map((text: string) => {
    const [start, end] = text.split("-").map(Number);
    return new Range(start, end + 1);
  });
  const availableIds = bottom.split("\n").map(Number);
  return { freshIdRanges, availableIds };
}
