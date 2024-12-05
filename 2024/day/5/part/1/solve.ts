export default function solve(input: string) {
  const [firstSection, secondSection] = input.split("\n\n");
  const rules = firstSection.split("\n")
    .map((line) => line.split("|").map(Number) as [number, number]);
  function isUpdateInTheRightOrder(update: number[]): boolean {
    const pageNumberToIndex = new Map(
      update.entries().map(([index, pageNumber]) => [pageNumber, index]),
    );
    for (const pageNumber of update) {
      const pageNumberIndex = pageNumberToIndex.get(pageNumber)!;
      for (const [x, y] of rules) {
        if (pageNumber !== x) continue;
        if (pageNumberIndex > pageNumberToIndex.get(y)!) return false;
      }
    }
    return true;
  }
  const updates = secondSection.split("\n")
    .map((line) => line.split(",").map(Number));
  return updates
    .filter((update) => isUpdateInTheRightOrder(update))
    .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
}
