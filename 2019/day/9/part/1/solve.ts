import { program } from "../../intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const outputs = Array.from(program(memory)([1]));
  return outputs.join(",");
}
