function itemTypePriority(itemType: string) {
  if (itemType >= "a" && itemType <= "z") {
    return 1 + itemType.charCodeAt(0) - "a".charCodeAt(0);
  }
  if (itemType >= "A" && itemType <= "Z") {
    return 27 + itemType.charCodeAt(0) - "A".charCodeAt(0);
  }
  throw new TypeError("item type must match /[a-zA-Z]/");
}

export default function solve(input: string) {
  let sum = 0;
  for (const [, ...lines] of input.matchAll(/(^.*$)\n(^.*$)\n(^.*$)/gm)) {
    const [a, b, c] = lines.map((line) => new Set(line));
    const commonItemType = [...a].find((type) => b.has(type) && c.has(type))!;
    sum += itemTypePriority(commonItemType);
  }
  return sum;
}
