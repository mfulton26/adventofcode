import { createProgram } from "../../intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const program = createProgram(memory);
  return program([1]).toArray().join(",");
}
