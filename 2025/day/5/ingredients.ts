export function parseDatabase(text: string) {
  const [top, bottom] = text.split("\n\n");
  const freshIdRanges = top.split("\n").map((text: string) => {
    const [start, end] = text.split("-").map(Number);
    return { start, end };
  });
  const availableIds = bottom.split("\n").map(Number);
  return { freshIdRanges, availableIds };
}
