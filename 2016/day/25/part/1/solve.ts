const instructionRegExp =
  /^(?<command>cpy|inc|dec|jnz|tgl|out) (?<x>-?\d+|[a-d])(?: (?<y>-?\d+|[a-d]))?$/gm;

export default function solve(input: string) {
  type Command = "cpy" | "inc" | "dec" | "jnz" | "tgl" | "out";
  type Register = "a" | "b" | "c" | "d";
  type Arg = `${number}` | Register;
  const tglMap = {
    cpy: "jnz",
    inc: "dec",
    dec: "inc",
    jnz: "cpy",
    tgl: "inc",
    out: "inc",
  } satisfies Record<Command, Command>;
  const originalInstructions = input.matchAll(instructionRegExp)
    .map(({ groups: { command, x, y } = {} }) => ({ command, x, y }))
    .toArray() as { command: Command; x: Arg; y?: Arg }[];
  for (let initialA = 0;; initialA++) {
    const values = { a: initialA, b: 0, c: 0, d: 0 };
    const instructions = structuredClone(originalInstructions);
    let expected = 0;
    let outputCount = 0;
    let validSignal = true;
    const getValue = (arg: Arg) =>
      arg in values ? values[arg as Register] : +arg;
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
      out: (i, x) => {
        if (getValue(x) !== expected) {
          validSignal = false;
          return instructions.length;
        }
        expected = 1 - expected;
        outputCount++;
        return outputCount === 100 ? instructions.length : i + 1;
      },
    };
    for (let i = 0; i in instructions;) {
      const { command, x, y } = instructions[i];
      i = handlers[command](i, x, y);
    }
    if (validSignal && outputCount >= 100) return initialA;
  }
}
