const instructionRegExp =
  /^(?<command>cpy|inc|dec|jnz|tgl) (?<x>-?\d+|[a-d])(?: (?<y>-?\d+|[a-d]))?$/gm;

export default function solve(input: string) {
  const values = { a: 12, b: 0, c: 0, d: 0 };
  type Command = "cpy" | "inc" | "dec" | "jnz" | "tgl";
  type Register = keyof typeof values;
  type Arg = `${number}` | Register;
  const tglMap = {
    cpy: "jnz",
    inc: "dec",
    dec: "inc",
    jnz: "cpy",
    tgl: "inc",
  } satisfies Record<Command, Command>;
  const instructions = input.matchAll(instructionRegExp)
    .map(({ groups: { command, x, y } = {} }) => ({ command, x, y }))
    .toArray() as { command: Command; x: Arg; y?: Arg }[];
  const multiplicationStart = instructions.findIndex(({ command }, i) =>
    command === "cpy" &&
    instructions[i + 1]?.command === "jnz" &&
    instructions[i + 2]?.command === "inc"
  );
  if (multiplicationStart >= 0) {
    const addend = +instructions[multiplicationStart].x;
    const multiplier = +instructions[multiplicationStart + 1].x;
    let factorial = 1;
    for (let value = 2; value <= values.a; value++) factorial *= value;
    return factorial + addend * multiplier;
  }
  const getValue = (arg: Arg) => arg in values ? values[arg as Register] : +arg;
  type Handler = (i: number, x: Arg, y?: Arg) => number;
  const handlers: Record<Command, Handler> = {
    cpy: (i, x, y) => (values[y as Register] = getValue(x), i + 1),
    inc: (i, x) => (++values[x as Register], i + 1),
    dec: (i, x) => (--values[x as Register], i + 1),
    jnz: (i, x, y) => getValue(x) ? i + getValue(y!) : i + 1,
    tgl: (i, x) => {
      const j = i + getValue(x);
      if (j in instructions) {
        instructions[j].command = tglMap[instructions[j].command];
      }
      return i + 1;
    },
  };
  for (let i = 0; i in instructions;) {
    const { command, x, y } = instructions[i];
    i = handlers[command](i, x, y);
  }
  return values.a;
}
