export default function solve(input: string) {
  const [top, bottom] = input.split("\n\n");
  const patterns = top.split(", ");
  const maxPatternLength = Math.max(...patterns.map(({ length }) => length));
  const designs = bottom.split("\n");
  let possibleCount = 0;
  const isPossibleRegExp = new RegExp(`^(?:${patterns.join("|")})+$`);
  for (const design of designs) {
    if (!isPossibleRegExp.test(design)) continue;
    const counts = Array.from({ length: design.length + 1 }, () => 0);
    counts[0] = 1;
    for (let j = 1; j <= design.length; j++) {
      for (let i = Math.max(0, j - maxPatternLength); i < j; i++) {
        if (patterns.includes(design.slice(i, j))) counts[j] += counts[i];
      }
    }
    possibleCount += counts.at(-1)!;
  }
  return possibleCount;
}
