export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  let lastOutput: number;
  for (const output of program(memory)([1])) lastOutput = output;
  return lastOutput!;
}

function program(memory: number[]) {
  return function* (inputs: Iterable<number>) {
    const inputIterator = inputs[Symbol.iterator]();
    for (let instructionPointer = 0; memory[instructionPointer] !== 99;) {
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
      }
    }
  };
}
