export function createProgram(memory: number[]) {
  return function* (inputs: Iterable<number>) {
    const inputIterator = inputs[Symbol.iterator]();
    let ip = 0;
    let relativeBase = 0;
    function readParam(mode: number) {
      const value = memory[ip++] ?? 0;
      if (mode === 0) return memory[value] ?? 0;
      if (mode === 1) return value;
      return memory[relativeBase + value] ?? 0;
    }
    function writeParam(mode: number, value: number) {
      const target = memory[ip++] ?? 0;
      if (mode === 0) memory[target] = value;
      memory[relativeBase + target] = value;
    }
    while (ip >= 0 && ip < memory.length) {
      const instruction = memory[ip++] ?? 0;
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
          writeParam(mode1, inputIterator.next().value ?? 0);
          break;
        }
        case 4: {
          yield readParam(mode1);
          break;
        }
        case 5: {
          const a = readParam(mode1);
          const b = readParam(mode2);
          if (a !== 0) ip = b;
          break;
        }
        case 6: {
          const a = readParam(mode1);
          const b = readParam(mode2);
          if (a === 0) ip = b;
          break;
        }
        case 7: {
          const a = readParam(mode1);
          const b = readParam(mode2);
          writeParam(mode3, a < b ? 1 : 0);
          break;
        }
        case 8: {
          const a = readParam(mode1);
          const b = readParam(mode2);
          writeParam(mode3, a === b ? 1 : 0);
          break;
        }
        case 9: {
          const a = readParam(mode1);
          relativeBase += a;
          break;
        }
        case 99:
          return;
      }
    }
  };
}
