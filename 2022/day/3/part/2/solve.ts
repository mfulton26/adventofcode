import { itemTypePriority } from "../../itemTypes.ts";

export default function solve(input: string) {
  let sum = 0;
  for (const [, ...lines] of input.matchAll(/(^.*$)\n(^.*$)\n(^.*$)/gm)) {
    const [a, b, c] = lines.map((line) => new Set(line));
    const commonItemType = [...a].find((type) => b.has(type) && c.has(type))!;
    sum += itemTypePriority(commonItemType);
  }
  return sum;
}
