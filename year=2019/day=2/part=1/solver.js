export function solve(
  input,
  {
    memoryReplacements = [
      [1, 12],
      [2, 2],
    ],
  } = {}
) {
  const memory = input.split(",").map(Number);
  for (const [position, value] of memoryReplacements) {
    memory[position] = value;
  }
  runProgram(memory);
  return memory[0];
}

export function runProgram(memory) {
  for (let instructionPointer = 0; memory[instructionPointer] !== 99; ) {
    const opcode = memory[instructionPointer++];
    const parameters = (function* () {
      while (true) {
        yield memory[instructionPointer++];
      }
    })();
    switch (opcode) {
      case 1: {
        const [a, b, c] = parameters;
        memory[c] = memory[a] + memory[b];
        break;
      }
      case 2: {
        const [a, b, c] = parameters;
        memory[c] = memory[a] * memory[b];
        break;
      }
    }
  }
  return memory;
}
