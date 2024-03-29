export default function solve(input: string) {
  const instructions = input.split("\n").map(Number);
  let step = 0;
  for (let index = 0; index < instructions.length; step++) {
    index += instructions[index]++;
  }
  return step;
}
