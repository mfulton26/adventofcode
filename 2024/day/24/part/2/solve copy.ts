const ops: Record<string, (a: boolean, b: boolean) => boolean> = {
  AND: (a, b) => a && b,
  OR: (a, b) => a || b,
  XOR: (a, b) => a !== b,
};

export default function solve(input: string) {
  const [, bottomSection] = input.split("\n\n");
  const gates = bottomSection.split("\n").map((line) => {
    const [x, op, y, , z] = line.split(" ");
    return { x, op, y, z };
  });
  const bitLength = Math.max(
    ...gates.filter(({ z }) => z.startsWith("z")).map(({ z }) => +z.slice(1)),
  );
  function add(x: number, y: number) {
    const wires = new Map<string, boolean>();
    for (let bit = 0; bit < bitLength; bit++) {
      const suffix = bit.toString().padStart(2, "0");
      wires.set(`x${suffix}`, (x & 2 ** bit) !== 0);
      wires.set(`y${suffix}`, (y & 2 ** bit) !== 0);
    }
    const pending = new Set(gates);
    while (pending.size) {
      for (const gate of pending) {
        const { x, op, y, z } = gate;
        if (!wires.has(x) || !wires.has(y)) continue;
        wires.set(z, ops[op](wires.get(x)!, wires.get(y)!));
        pending.delete(gate);
      }
    }
    let result = 0;
    for (const [key, value] of wires) {
      if (!key.startsWith("z") || !value) continue;
      result += 2 ** +key.slice(1);
    }
    return result;
  }
//   function toBinaryString(value: number) {
//     return `0b${value.toString(2).padStart(bitLength, "0")}`;
//   }
//   for (let bit = 0; bit < bitLength; bit++) {
//     const value = 2 ** bit;
//     const result = add(value, value);
//     console.log(
//       toBinaryString(value),
//       "+",
//       toBinaryString(value),
//       value + value === result ? "===" : "!==",
//       toBinaryString(result),
//     );
//   }
//   for (let bit = 0; bit < bitLength; bit++) {
//     const value = 2 ** bitLength - 1 - 2 ** bit;
//     const result = add(value, value);
//     console.log(
//       toBinaryString(value),
//       "+",
//       toBinaryString(value),
//       value + value === result ? "===" : "!==",
//       toBinaryString(result),
//     );
//   }
//   while (true) {
//     const x = Math.floor(Math.random() * 2 ** bitLength);
//     const y = Math.floor(Math.random() * 2 ** bitLength);
//     const result = add(x, y);
//     const equals = x + y === result;
//     if (!equals) continue;
//     console.log(
//       toBinaryString(x),
//       "+",
//       toBinaryString(y),
//       equals ? "===" : "!==",
//       toBinaryString(result),
//     );
//     if (equals) break;
//   }
  return "";
}
