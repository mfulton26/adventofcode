import { parseNumbers } from "../../numbers.ts";

export default function solve(input: string) {
  const { left, right } = parseNumbers(input);
  const counts = new Map<number, number>();
  for (const value of right) counts.set(value, (counts.get(value) ?? 0) + 1);
  let sum = 0;
  for (const value of left) sum += value * (counts.get(value) ?? 0);
  return sum;
}
