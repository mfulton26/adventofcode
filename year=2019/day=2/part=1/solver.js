/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const memory = input.split(",").map(Number);
  memory[1] = 12;
  memory[2] = 2;
  runProgram(memory);
  return memory[0];
}

/**
 * @param {number[]} memory
 * @returns {number[]}
 */
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
