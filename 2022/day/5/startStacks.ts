export function parseStartingStacks(text: string) {
  const [idLine, ...crateLines] = text.split("\n").reverse();
  const result = new Map<string, string[]>();
  for (const { 0: id, index } of idLine.matchAll(/\S+/g)) {
    const stack = crateLines
      .map((line) => line.charAt(index!))
      .filter((char) => char !== " ");
    result.set(id, stack);
  }
  return result;
}
