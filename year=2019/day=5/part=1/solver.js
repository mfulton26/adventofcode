import { findLast } from "../../../iterables/lastFinder.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const memory = input.split(",").map(Number);
  return /** @type {number} */ (findLast(program(memory)([1])));
}

/**
 * @param {number[]} memory
 * @returns {(inputs: Iterable<number>) => Generator<number>}
 */
function program(memory) {
  return function* (inputs) {
    const inputIterator = inputs[Symbol.iterator]();
    for (let instructionPointer = 0; memory[instructionPointer] !== 99; ) {
      const instruction = memory[instructionPointer++];
      const opcode = instruction % 100;
      const parameters = {
        [Symbol.iterator]() {
          return this;
        },
        divisor: 10,
        /**
         * @param {number=} value
         */
        next(value) {
          this.divisor *= 10;
          const mode = Math.trunc(instruction / this.divisor) % 10;
          const position =
            mode === 0 ? memory[instructionPointer++] : instructionPointer++;
          if (value === undefined) {
            value = memory[position];
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
