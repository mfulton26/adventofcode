import { itemTypePriority } from "../../itemTypes.ts";

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
