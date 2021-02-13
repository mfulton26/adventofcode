export function solve(input) {
  const ids = input.split("\n");
  let twosCount = 0;
  let threesCount = 0;
  for (const id of ids) {
    const map = new Map();
    for (const char of id) {
      const count = map.has(char) ? map.get(char) : 0;
      map.set(char, count + 1);
    }
    const counts = new Set(map.values());
    if (counts.has(2)) {
      twosCount += 1;
    }
    if (counts.has(3)) {
      threesCount += 1;
    }
  }
  return twosCount * threesCount;
}
