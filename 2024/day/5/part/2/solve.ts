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
  function putUpdateInTheRightOrder(update: number[]): typeof update {
    const predecessors = rules.reduce(
      (map, [x, y]) => (map.get(x)?.push(y) ?? map.set(x, [y]), map),
      new Map<number, number[]>(),
    );
    return update.sort((a, b) => {
      if (predecessors.get(a)?.includes(b)) return -1;
      if (predecessors.get(b)?.includes(a)) return 1;
      return 0;
    });
  }
  const updates = secondSection.split("\n")
    .map((line) => line.split(",").map(Number));
  return updates
    .filter((update) => !isUpdateInTheRightOrder(update))
    .map((update) => putUpdateInTheRightOrder(update))
    .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);
}
