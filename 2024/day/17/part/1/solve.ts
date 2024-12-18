function run(a: number, b: number, c: number, program: number[]) {
  const output: number[] = [];
  function combo(operand: number) {
    if (operand < 4) return operand;
    switch (operand) {
      case 0:
      case 1:
      case 2:
        return operand;
      case 4:
        return a;
      case 5:
        return b;
      case 6:
        return c;
      default:
        throw new Error(`unsupported combo literal: ${operand}`);
    }
  }
  function div(operand: number) {
    return Math.trunc(a / 2 ** combo(operand));
  }
  for (let ip = 0; ip in program;) {
    const opcode = program[ip++];
    const operand = program[ip++];
    switch (opcode) {
      case 0: // adv
        a = div(operand);
        break;
      case 1: // bxl
        b = b ^ operand;
        break;
      case 2: // bst
        b = combo(operand) % 8;
        break;
      case 3: // jnz
        if (a) ip = operand;
        break;
      case 4: // bxc
        b ^= c;
        break;
      case 5: // out
        output.push(combo(operand) % 8);
        break;
      case 6: // bdv
        b = div(operand);
        break;
      case 7: // cdv
        c = div(operand);
        break;
    }
  }
  return output;
}

export default function solve(input: string) {
  const [top, bottom] = input.split("\n\n");
  const [a, b, c] = top.matchAll(/\d+/g)!.map(([v]) => +v);
  const program = bottom.split(": ")[1].split(",").map(Number);
  return run(a, b, c, program).join(",");
}
