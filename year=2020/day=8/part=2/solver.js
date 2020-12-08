export function solve(input) {
  const instructions = input.split("\n").map((line) => line.split(" "));
  const swap = { jmp: "nop", nop: "jmp" };
  for (let i = 0; i < instructions.length; i++) {
    const [operation, argument] = instructions[i];
    if (operation in swap) {
      const copy = Array.from(instructions);
      copy[i] = [swap[operation], argument];
      const { terminates, accumulator } = test(copy);
      if (terminates) {
        return accumulator;
      }
    }
  }
}

function test(instructions) {
  const seen = new Set();
  let accumulator = 0;
  for (let i = 0; i < instructions.length; i++) {
    if (seen.has(i)) {
      return { terminates: false, accumulator };
    }
    seen.add(i);
    const [operation, argument] = instructions[i];
    switch (operation) {
      case "acc":
        accumulator += Number(argument);
        break;
      case "jmp":
        i += Number(argument) - 1;
        break;
      case "nop":
        break;
    }
  }
  return { terminates: true, accumulator };
}
