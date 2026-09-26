export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  const program = createProgram(memory);
  return program([1]).reduce((_, lastOutput) => lastOutput);
}

function createProgram(memory: number[]) {
  return function* (inputs: Iterable<number>) {
    const inputIterator = inputs[Symbol.iterator]();
    let ip = 0;
    function readParam(mode: number) {
      return mode === 0 ? memory[memory[ip++]] : memory[ip++];
    }
    function writeParam(mode: number, value: number) {
      const target = mode === 0 ? memory[ip++] : ip++;
      memory[target] = value;
    }
    while (ip >= 0 && ip < memory.length) {
      const instruction = memory[ip++];
      const opcode = instruction % 100;
      const mode1 = Math.floor(instruction / 1e2) % 10;
      const mode2 = Math.floor(instruction / 1e3) % 10;
      const mode3 = Math.floor(instruction / 1e4) % 10;
      switch (opcode) {
        case 1: {
          const a = readParam(mode1);
          const b = readParam(mode2);
          writeParam(mode3, a + b);
          break;
        }
        case 2: {
          const a = readParam(mode1);
          const b = readParam(mode2);
          writeParam(mode3, a * b);
          break;
        }
        case 3: {
          writeParam(mode1, inputIterator.next().value);
          break;
        }
        case 4: {
          yield readParam(mode1);
          break;
        }
        case 99:
          return;
      }
    }
  };
}
