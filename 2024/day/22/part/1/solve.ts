import { generateSecrets } from "../../secrets.ts";

export default function solve(input: string) {
  const initialSecrets = input.split("\n").map(Number);
  let sum = 0;
  for (const initialSecret of initialSecrets) {
    sum += generateSecrets(initialSecret).at(-1)!;
  }
  return sum;
}
