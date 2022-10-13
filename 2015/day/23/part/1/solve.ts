export default function solve(input: string) {
  return exec(input).b;
}

export function exec(input: string, { a = 0, b = 0 } = {}) {
  const registers = { a, b };
  let index = 0;
  const instructions = input.split("\n").map((line) => {
    const words = line.split(/,? /);
    switch (words[0]) {
      case "hlf":
        return () => (registers[parseRegisterName(words[1])] /= 2, index++);
      case "tpl":
        return () => (registers[parseRegisterName(words[1])] *= 3, index++);
      case "inc":
        return () => (registers[parseRegisterName(words[1])]++, index++);
      case "jmp":
        return () => index += parseInt(words[1]);
      case "jie":
        return () =>
          index += registers[parseRegisterName(words[1])] % 2 === 0
            ? parseInt(words[2])
            : 1;
      case "jio":
        return () =>
          index += registers[parseRegisterName(words[1])] === 1
            ? parseInt(words[2])
            : 1;
      default:
        throw new SyntaxError(`illegal instruction: ${words[0]}`);
    }
  });
  while (index < instructions.length) instructions[index]();
  return registers;
}

function parseRegisterName(value: string) {
  switch (value) {
    case "a":
    case "b":
      return value;
    default:
      throw new SyntaxError();
  }
}
