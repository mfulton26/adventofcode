export default function solve(input: string) {
  const initialMemory = input.split(",").map(Number);
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const memory = initialMemory.slice();
      memory[1] = noun;
      memory[2] = verb;
      runProgram(memory);
      if (memory[0] !== 19690720) continue;
      return 100 * noun + verb;
    }
  }
}

export function runProgram(memory: number[]) {
  for (let ip = 0; memory[ip] !== 99;) {
    const opcode = memory[ip++];
    const a = memory[ip++];
    const b = memory[ip++];
    const c = memory[ip++];
    switch (opcode) {
      case 1:
        memory[c] = memory[a] + memory[b];
        break;
      case 2:
        memory[c] = memory[a] * memory[b];
        break;
    }
  }
  return memory;
}
