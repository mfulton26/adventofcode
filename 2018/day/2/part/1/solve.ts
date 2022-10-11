export default function solve(input: string) {
  const ids = input.split("\n");
  let twosCount = 0;
  let threesCount = 0;
  for (const id of ids) {
    const map = new Map<string, number>();
    for (const char of id) map.set(char, (map.get(char) ?? 0) + 1);
    const counts = new Set(map.values());
    if (counts.has(2)) twosCount += 1;
    if (counts.has(3)) threesCount += 1;
  }
  return twosCount * threesCount;
}
