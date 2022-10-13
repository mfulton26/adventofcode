export default function solve(input: string) {
  const instructions = input.split("\n")
    .map((line) => line.split(" ") as [string, string]);
  const seen = new Set<number>();
  let accumulator = 0;
  for (let i = 0; i < instructions.length; i++) {
    if (seen.has(i)) return accumulator;
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
