export type WireValues = ReturnType<typeof parseInitialWireValues>;
export type GateConnections = ReturnType<typeof parseGateConnections>;

const gateRegExp = /^(?<a>\S+) (?<op>AND|OR|XOR) (?<b>\S+) -> (?<c>\S+)$/gm;

const ops: Record<string, (x: number, y: number) => number> = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
};

function parseInitialWireValues(text: string) {
  return text.split("\n").reduce((map, line) => {
    const [wire, value] = line.split(": ");
    return map.set(wire, +value);
  }, new Map<string, number>());
}

function parseGateConnections(text: string) {
  return text.matchAll(gateRegExp).reduce(
    (map, [, a, op, b, c]) => map.set({ a, op, b }, c),
    new Map<{ a: string; op: string; b: string }, string>(),
  );
}

export function parseInput(input: string) {
  const [top, bottom] = input.split("\n\n");
  const initialWireValues = parseInitialWireValues(top);
  const gateConnections = parseGateConnections(bottom);
  return { initialWireValues, gateConnections };
}

export function output(
  initialWireValues: WireValues,
  gateConnections: GateConnections,
) {
  const wireValues = new Map(initialWireValues);
  const pendingGateConnections = new Map(gateConnections);
  while (pendingGateConnections.size) {
    for (const [gate, wire] of pendingGateConnections) {
      const { a, op, b } = gate;
      const x = wireValues.get(a), y = wireValues.get(b);
      if (x === undefined || y === undefined) continue;
      const z = ops[op](x, y);
      wireValues.set(wire, z);
      pendingGateConnections.delete(gate);
    }
  }
  let result = 0n;
  for (const [wire, value] of wireValues) {
    if (value === 0 || !wire.startsWith("z")) continue;
    const bit = BigInt(wire.slice(1));
    result ^= 2n ** bit;
  }
  return Number(result);
}
