const swap: Record<string, string> = { jmp: "nop", nop: "jmp" };

export default function solve(input: string) {
  const instructions = input.split("\n")
    .map((line) => line.split(" ") as [string, string]);
  for (let i = 0; i < instructions.length; i++) {
    const [operation, argument] = instructions[i];
    if (!(operation in swap)) continue;
    const copy = [...instructions];
    copy[i] = [swap[operation], argument];
    const { terminates, accumulator } = test(copy);
    if (terminates) return accumulator;
  }
}

function test(instructions: [string, string][]) {
  const seen = new Set<number>();
  let accumulator = 0;
  for (let i = 0; i < instructions.length; i++) {
    if (seen.has(i)) return { terminates: false, accumulator };
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
