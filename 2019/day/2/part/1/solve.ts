export default function solve(
  input: string,
  { memoryReplacements = [[1, 12], [2, 2]] } = {},
) {
  const memory = input.split(",").map(Number);
  for (const [position, value] of memoryReplacements) memory[position] = value;
  runProgram(memory);
  return memory[0];
}

export function runProgram(memory: number[]) {
  for (let ip = 0; memory[ip] !== 99;) {
    const opcode = memory[ip++];
    const a = memory[ip++];
    const b = memory[ip++];
    const c = memory[ip++];
    switch (opcode) {
      case 1:
        memory[c] = memory[a] + memory[b];
        break;
      case 2:
        memory[c] = memory[a] * memory[b];
        break;
    }
  }
  return memory;
}
