const DESIRED_OUTPUT = 19690720;

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const initialMemory = input.split(",").map(Number);
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const memory = initialMemory.slice();
      memory[1] = noun;
      memory[2] = verb;
      runProgram(memory);
      if (memory[0] === DESIRED_OUTPUT) {
        return 100 * noun + verb;
      }
    }
  }
  throw new Error(
    `no input noun and verb found to cause the program to produce the output ${DESIRED_OUTPUT}`
  );
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
