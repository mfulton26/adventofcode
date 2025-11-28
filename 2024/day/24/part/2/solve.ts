const ops: Record<string, (a: boolean, b: boolean) => boolean> = {
  AND: (a, b) => a && b,
  OR: (a, b) => a || b,
  XOR: (a, b) => a !== b,
};

export default function solve(input: string) {
  const [topSection, bottomSection] = input.split("\n\n");
  const initialWires = topSection.split("\n").reduce(
    (map, line) => map.set(line.slice(0, 3), line.slice(5) === "1"),
    new Map<string, boolean>(),
  );
  const gates = bottomSection.split("\n").map((line) => {
    const [x, op, y, , z] = line.split(" ");
    return { x, op, y, z };
  });
  const bitLength = Math.max(
    ...gates.filter(({ z }) => z.startsWith("z")).map(({ z }) => +z.slice(1)),
  );
  const connections = new Map<string, Set<string>>();
  const patterns = Array.from({ length: bitLength }, () => [] as string[]);
  const wires = new Map(initialWires);
  const pending = new Set(gates);
  while (pending.size) {
    for (const gate of pending) {
      const { x, op, y, z } = gate;
      if (!wires.has(x) || !wires.has(y)) continue;
      wires.set(z, ops[op](wires.get(x)!, wires.get(y)!));
      pending.delete(gate);
    }
  }
  console.log(patterns);
  return "";
}
