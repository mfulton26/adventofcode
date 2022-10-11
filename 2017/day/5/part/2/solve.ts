export default function solve(input: string) {
  const instructions = input.split("\n").map(Number);
  let step = 0;
  for (let index = 0; index < instructions.length; step++) {
    const instruction = instructions[index];
    if (instruction >= 3) instructions[index] = instruction - 1;
    else instructions[index] = instruction + 1;
    index += instruction;
  }
  return step;
}
