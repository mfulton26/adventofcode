import { findLast } from "../../../iterables/lastFinder.js";
import { findMax } from "../../../iterables/maxFinder.js";
import { permute } from "../../../iterables/permuter.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const initialMemory = input.split(",").map(Number);
  const phaseSettings = [0, 1, 2, 3, 4];
  return /** @type {number} */ (findMax(
    outputSignals(initialMemory, phaseSettings)
  ));
}

/**
 * @param {number[]} initialMemory
 * @param {number[]} phaseSettings
 */
function* outputSignals(initialMemory, phaseSettings) {
  for (const permutation of permute(phaseSettings)) {
    const memory = initialMemory.slice();
    let output = 0;
    for (const phaseSetting of permutation) {
      const inputs = [phaseSetting, output];
      output = /** @type {number} */ (findLast(program(memory)(inputs)));
    }
    yield output;
  }
}

/**
 * @param {number[]} memory
 * @returns {(inputs: Iterable<number>) => Generator<number>}
 */
function program(memory) {
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
        /**
         * @param {number} [value]
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
