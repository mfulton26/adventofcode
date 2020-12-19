export function solve(input) {
  const memory = input.split(",").map(Number);
  const outputs = Array.from(program(memory)([1]));
  return outputs.join(",");
}

function program(memory) {
  return function* (inputs) {
    const inputIterator = inputs[Symbol.iterator]();
    for (
      let instructionPointer = 0, relativeBase = 0;
      instructionPointer >= 0 &&
      instructionPointer < memory.length &&
      memory[instructionPointer] !== 99;

    ) {
      const instruction = memory[instructionPointer++] ?? 0;
      const opcode = instruction % 100;
      const parameters = {
        [Symbol.iterator]() {
          return this;
        },
        divisor: 10,
        next(value) {
          this.divisor *= 10;
          const mode = Math.trunc(instruction / this.divisor) % 10;
          let position;
          switch (mode) {
            case 0:
              position = memory[instructionPointer++] ?? 0;
              break;
            case 1:
              position = instructionPointer++;
              break;
            case 2:
              position = relativeBase + memory[instructionPointer++] ?? 0;
              break;
          }
          if (value === undefined) {
            value = memory[position] ?? 0;
          } else {
            memory[position] = value;
          }
          return {
            value,
            done: false,
          };
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
          const [input] = inputIterator;
          parameters.next(input);
          break;
        }
        case 4: {
          const [output] = parameters;
          yield output;
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
        case 9: {
          const [a] = parameters;
          relativeBase += a;
          break;
        }
      }
    }
  };
}
