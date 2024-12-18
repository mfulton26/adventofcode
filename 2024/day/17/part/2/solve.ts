type Registers = Record<"a" | "b" | "c", bigint>;

function run({ a, b, c }: Registers, program: number[]) {
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

/** adapted from https://github.com/gbasov/aoc24/blob/0c8149623f7f7ccf6da1d072d439bb60136aea10/17/part2.ts */
function findA(
  { b, c }: Omit<Registers, "a">,
  program: number[],
  input = 0n,
  offset = program.length - 1,
): bigint | undefined {
  if (offset === -1) return input;

  for (let i = 0n; i < 8n; i++) {
    const a = (input << 3n) + i;
    const output = run({ a, b, c }, program);
    if (output[0] !== program.at(offset)) continue;
    const min = findA({ b, c }, program, a, offset - 1);
    if (min === undefined) continue;
    return min;
  }
}

export default function solve(input: string) {
  const [top, bottom] = input.split("\n\n");
  const [b, c] = top.matchAll(/\d+/g)!.map(([v]) => BigInt(v));
  const program = bottom.split(": ")[1].split(",").map(Number);
  return findA({ b, c }, program)?.toString();
}
