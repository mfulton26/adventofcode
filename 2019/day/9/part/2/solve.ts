import { createProgram } from "../../intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const program = createProgram(memory);
  return program([2]).toArray().join(",");
}
