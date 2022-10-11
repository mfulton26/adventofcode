import permute from "helpers/permute.ts";

export default function solve(input: string) {
  const initialMemory = input.split(",").map(Number);
  const phaseSettings = [0, 1, 2, 3, 4];
  let highestSignal = -Infinity;
  for (const signal of outputSignals(initialMemory, phaseSettings)) {
    if (signal < highestSignal) continue;
    highestSignal = signal;
  }
  return highestSignal;
}

function* outputSignals(initialMemory: number[], phaseSettings: number[]) {
  for (const permutation of permute(phaseSettings)) {
    const memory = initialMemory.slice();
    let lastOutput = 0;
    for (const phaseSetting of permutation) {
      const inputs = [phaseSetting, lastOutput];
      for (const output of program(memory)(inputs)) lastOutput = output;
    }
    yield lastOutput;
  }
}

function program(
  memory: number[],
): (inputs: Iterable<number>) => IterableIterator<number> {
  return function* (inputs) {
    const inputIterator = inputs[Symbol.iterator]();
    for (
      let instructionPointer = 0;
      instructionPointer >= 0 &&
      instructionPointer < memory.length &&
      memory[instructionPointer] !== 99;
    ) {
      const instruction = memory[instructionPointer++];
      const opcode = instruction % 100;
      const parameters = {
        [Symbol.iterator]() {
          return this;
        },
        divisor: 10,
        next(value?: number) {
          this.divisor *= 10;
          const mode = Math.trunc(instruction / this.divisor) % 10;
          const position = mode === 0
            ? memory[instructionPointer++]
            : instructionPointer++;
          if (value === undefined) value = memory[position];
          else memory[position] = value;
          return { value, done: false as const };
        },
      };
      switch (opcode) {
        case 1: {
          const [a, b] = parameters;
          parameters.next(a + b);
          break;
        }
        case 2: {
          const [a, b] = parameters;
          parameters.next(a * b);
          break;
        }
        case 3: {
          parameters.next(inputIterator.next().value);
          break;
        }
        case 4: {
          yield parameters.next().value;
          break;
        }
        case 5: {
          const [a, b] = parameters;
          if (a !== 0) {
            instructionPointer = b;
          }
          break;
        }
        case 6: {
          const [a, b] = parameters;
          if (a === 0) {
            instructionPointer = b;
          }
          break;
        }
        case 7: {
          const [a, b] = parameters;
          parameters.next(a < b ? 1 : 0);
          break;
        }
        case 8: {
          const [a, b] = parameters;
          parameters.next(a === b ? 1 : 0);
          break;
        }
      }
    }
  };
}
