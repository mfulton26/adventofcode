import { exec } from "../1/solve.ts";

export default function solve(input: string) {
  return exec(input, { a: 1 }).b;
}
