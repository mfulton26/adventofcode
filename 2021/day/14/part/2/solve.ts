export default function solve(input: string) {
  const template = input.substring(0, input.indexOf("\n"));
  const insertions = new Map<string, string>();
  for (const [, pair, insert] of input.matchAll(/(\S\S) -> (\S)/g)) {
    insertions.set(pair, insert);
  }
  const pairCounts = new Map<string, number>();
  for (let i = 1; i < template.length; i++) {
    const pair = template.slice(i - 1, i + 1);
    const count = pairCounts.get(pair) ?? 0;
    pairCounts.set(pair, count + 1);
  }
  for (let i = 0; i < 40; i++) {
    for (const [pair, pairCount] of Array.from(pairCounts)) {
      const insertion = insertions.get(pair);
      if (insertion === undefined) continue;
      {
        const count = pairCounts.get(pair) ?? 0;
        if (count === pairCount) pairCounts.delete(pair);
        else pairCounts.set(pair, count - pairCount);
      }
      const [left, right] = pair;
      for (const pair of [`${left}${insertion}`, `${insertion}${right}`]) {
        const count = pairCounts.get(pair) ?? 0;
        pairCounts.set(pair, count + pairCount);
      }
    }
  }
  const elementCounts = new Map<string, number>();
  for (const [pair, pairCount] of pairCounts) {
    for (const element of pair) {
      const count = elementCounts.get(element) ?? 0;
      elementCounts.set(element, count + pairCount);
    }
  }
  for (const [element, count] of elementCounts) {
    elementCounts.set(element, Math.ceil(count / 2));
  }
  const max = Math.max(...elementCounts.values());
  const min = Math.min(...elementCounts.values());
  return max - min;
}
