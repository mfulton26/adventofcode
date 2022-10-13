export default function solve(input: string) {
  const template = input.substring(0, input.indexOf("\n"));
  const insertions = new Map<string, string>();
  for (const [, pair, insert] of input.matchAll(/(\S\S) -> (\S)/g)) {
    insertions.set(pair, insert);
  }
  const searchValue = new RegExp(
    Array.from(insertions.keys(), ([a, b]) => `${a}(?=${b})`).join("|"),
    "g",
  );
  let polymer = template;
  for (let i = 0; i < 10; i++) {
    polymer = polymer.replaceAll(
      searchValue,
      (element: string, offset: number, polymer: string) =>
        `${element}${insertions.get(polymer.substring(offset, offset + 2))}`,
    );
  }
  const elementCounts = new Map<string, number>();
  for (const element of polymer) {
    elementCounts.set(element, (elementCounts.get(element) ?? 0) + 1);
  }
  const max = Math.max(...elementCounts.values());
  const min = Math.min(...elementCounts.values());
  return max - min;
}
