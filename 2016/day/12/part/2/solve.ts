const instructionRegExp =
  /^(?<command>cpy|inc|dec|jnz) (?<x>-?\d+|[a-d])(?: (?<y>-?\d+|[a-d]))?$/gm;

export default function solve(input: string) {
  const instructions = input.matchAll(instructionRegExp)
    .map(({ groups: { command, x, y } = {} }) => ({ command, x, y }))
    .toArray();
  const values = { a: 0, b: 0, c: 1, d: 0 };
  type Key = keyof typeof values;
  type Arg = `${number}` | Key;
  const handlers: Record<string, (x: Arg, y?: Arg) => number> = {
    cpy: (x, y) => (values[y as Key] = x in values ? values[x as Key] : +x, 1),
    inc: (x) => (++values[x as Key], 1),
    dec: (x) => (--values[x as Key], 1),
    jnz: (x, y) => (x in values ? values[x as Key] : +x) ? +y! : 1,
  };
  for (let i = 0; i in instructions;) {
    const { command, x, y } = instructions[i];
    i += handlers[command](x as Arg, y as Arg);
  }
  return values.a;
}
