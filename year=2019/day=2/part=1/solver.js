const defaultMemoryReplacements = /** @type {[number, number][]} */ (Object.freeze(
  [Object.freeze([1, 12]), Object.freeze([2, 2])]
));

/**
 * @param {string} input
 * @param {object} [options]
 * @param {readonly (readonly [number, number])[]} [options.memoryReplacements]
 * @returns {number}
 */
export function solve(
  input,
  { memoryReplacements = defaultMemoryReplacements } = {}
) {
  const memory = input.split(",").map(Number);
  for (const [position, value] of memoryReplacements) {
    memory[position] = value;
  }
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
