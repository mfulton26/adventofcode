export default function solve(input: string) {
  const [top, bottom] = input.split("\n\n");
  const patterns = top.split(", ");
  const designs = bottom.split("\n");
  let possibleCount = 0;
  const tester = new RegExp(`^(?:${patterns.join("|")})+$`);
  for (const design of designs) if (tester.test(design)) possibleCount++;
  return possibleCount;
}
