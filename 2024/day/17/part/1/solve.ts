function run({ a, b, c }: Record<"a" | "b" | "c", bigint>, program: number[]) {
  const output: number[] = [];
  function combo(operand: number): bigint {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return BigInt(operand);
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
    return a / 2n ** combo(operand);
  }
  for (let ip = 0; ip in program;) {
    const opcode = program[ip++];
    const operand = program[ip++];
    switch (opcode) {
      case 0: // adv
        a = div(operand);
        break;
      case 1: // bxl
        b = b ^ BigInt(operand);
        break;
      case 2: // bst
        b = combo(operand) % 8n;
        break;
      case 3: // jnz
        if (a) ip = operand;
        break;
      case 4: // bxc
        b ^= c;
        break;
      case 5: // out
        output.push(Number(combo(operand) % 8n));
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
  const [a, b, c] = top.matchAll(/\d+/g)!.map(([v]) => BigInt(v));
  const program = bottom.split(": ")[1].split(",").map(Number);
  return run({ a, b, c }, program).join(",");
}
