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
  for (const [line] of input.matchAll(/^.+$/gm)) {
    const a = new Set(line.substring(0, line.length / 2));
    const b = new Set(line.substring(line.length / 2));
    const commonItemType = [...a].find((type) => b.has(type))!;
    sum += itemTypePriority(commonItemType);
  }
  return sum;
}
