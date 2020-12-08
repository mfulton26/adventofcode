export function solve(input) {
  const instructions = input.split("\n").map((line) => line.split(" "));
  const seen = new Set();
  let accumulator = 0;
  for (let i = 0; i < instructions.length; i++) {
    if (seen.has(i)) {
      return accumulator;
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
}
