import { parseNumbers } from "../../numbers.ts";

export default function solve(input: string) {
  const { left, right } = parseNumbers(input);
  left.sort((a, b) => a - b), right.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < left.length; i++) sum += Math.abs(left[i] - right[i]);
  return sum;
}
