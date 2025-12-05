export function parseIngredientsDatabase(text: string) {
  const [top, bottom] = text.split("\n\n");
  const freshIdRanges = top.split("\n")
    .map((text: string) => text.split("-").map(Number) as [number, number]);
  const availableIds = bottom.split("\n").map(Number);
  return { freshIdRanges, availableIds };
}
