export function parseDatabase(text: string) {
  const [top, bottom] = text.split("\n\n");
  const freshIdRanges = top.matchAll(/(?<start>\d+)-(?<end>\d+)/g)
    .map(({ groups: { start, end } = {} }) => ({ start: +start, end: +end }))
    .toArray();
  const availableIds = bottom.split("\n").map(Number);
  return { freshIdRanges, availableIds };
}
