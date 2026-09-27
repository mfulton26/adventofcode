import { createProgram } from "../../../9/intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  memory[0] = 2;
  const program = createProgram(memory);
  const outputs: number[] = [];
  let score = 0, paddleX = 0, ballX = 0;
  for (const output of program(() => Math.sign(ballX - paddleX))) {
    outputs.push(output);
    if (outputs.length < 3) continue;
    const [x, y, value] = outputs;
    outputs.length = 0;
    if (x === -1 && y === 0) score = value;
    else if (value === 3) paddleX = x;
    else if (value === 4) ballX = x;
  }
  return score;
}
