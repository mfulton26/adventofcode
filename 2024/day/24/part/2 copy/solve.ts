import {
  GateConnections,
  output,
  parseInput,
  WireValues,
} from "../../monitoringDevices.ts";

function getValue(wireValues: WireValues, group: "x" | "y" | "z") {
  let result = 0n;
  for (const [wire, value] of wireValues) {
    if (value === 0 || wire[0] !== group) continue;
    const bit = BigInt(wire.slice(1));
    result ^= 2n ** bit;
  }
  return Number(result);
}

export default function solve(input: string, { bitLength = 44 } = {}) {
  const { initialWireValues, gateConnections } = parseInput(input);
  const gateConnectionsByBitIndex = Array.from(
    { length: bitLength },
    () => new Map() as GateConnections,
  );
  const zeroedXYWireValues = new Map(initialWireValues);
  for (let bitIndex = 0; bitIndex < bitLength; bitIndex++) {
    const number = bitIndex.toString().padStart(2, "0");
    zeroedXYWireValues.set(`x${number}`, 0);
    zeroedXYWireValues.set(`y${number}`, 0);
  }
  for (let bitIndex = 0; bitIndex < bitLength; bitIndex++) {
    const wireValues = new Map(zeroedXYWireValues);
    const number = bitIndex.toString().padStart(2, "0");
    for (const [x, y, z] of [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 2]]) {
      zeroedXYWireValues.set(`x${number}`, x);
      zeroedXYWireValues.set(`y${number}`, y);
      const actual = output(wireValues, gateConnections).toString(2);
      console.log({ bitIndex, x, y, expected: z, actual });
    }
  }

  return "";
}

// export default function solve(input: string) {
//   const { initialWireValues, gateConnections } = parseInput(input);
//   const x = getValue(initialWireValues, "x"),
//     y = getValue(initialWireValues, "y");
//   const lastZWire = gateConnections.values().filter(([char]) => char === "z")
//     .toArray().sort().at(-1);
//   const candidateZGates = new Set(
//     gateConnections.entries().filter(([{ op }, wire]) =>
//       op !== "XOR" && wire[0] === "z" && wire !== lastZWire
//     ).map(([gate]) => gate),
//   );
//   const candidateXORGates = new Set(
//     gateConnections.entries().filter(([{ a, op, b }, wire]) =>
//       op === "XOR" && !"xy".includes(a[0]) && !"xy".includes(b[0]) &&
//       wire[0] !== "z"
//     ).map(([gate]) => gate),
//   );
//   const candidateGates = [...candidateZGates.union(candidateXORGates)];

//   for (let i = 0; i < candidateGates.length; i++) {
//     console.log(i, candidateGates.length);
//     const a = candidateGates[i];
//     for (let j = i + 1; j < candidateGates.length; j++) {
//       const b = candidateGates[j];
//       const oneSwapped = new Map(gateConnections);
//       oneSwapped.set(a, gateConnections.get(b)!);
//       oneSwapped.set(b, gateConnections.get(a)!);
//       for (let k = j + 1; k < candidateGates.length; k++) {
//         const c = candidateGates[k];
//         for (let l = k + 1; l < candidateGates.length; l++) {
//           const d = candidateGates[l];
//           const twoSwapped = new Map(oneSwapped);
//           twoSwapped.set(c, gateConnections.get(d)!);
//           twoSwapped.set(d, gateConnections.get(c)!);
//           console.log(
//             [a, b, c, d].map((gate) => twoSwapped.get(gate)).sort().join(),
//           );
//           const z = output(initialWireValues, twoSwapped);
//           console.log({ x, y, z });
//           if (z === x + y) {
//             return [a, b, c, d].map((gate) => twoSwapped.get(gate)).sort()
//               .join();
//           }
//         }
//       }
//     }
//   }
//   return "";
// }

// export default function solve(input: string, { BIT_LENGTH = 45 } = {}) {
//   const parts = input.trim().split("\n\n").map((lines) => lines.split("\n"));
//   const wires = parts[0].reduce<{ [key: string]: number }>((obj, line) => {
//     const [left, right] = line.split(": ");
//     obj[left] = parseInt(right);
//     return obj;
//   }, {});

//   const instructions = parts[1].map((line) => {
//     const tokens = line.split(" ");
//     return {
//       a: tokens[0],
//       b: tokens[2],
//       c: tokens[4],
//       operation: tokens[1],
//       executed: false,
//     };
//   });

//   // for my input, no carry flags were swapped
//   const incorrect: string[] = [];
//   for (let i = 0; i < BIT_LENGTH; i++) {
//     const id = i.toString().padStart(2, "0");
//     const xor1 = instructions.find((instruction) =>
//       ((instruction.a === `x${id}` && instruction.b === `y${id}`) ||
//         (instruction.a === `y${id}` && instruction.b === `x${id}`)) &&
//       instruction.operation === "XOR"
//     );
//     const and1 = instructions.find((instruction) =>
//       ((instruction.a === `x${id}` && instruction.b === `y${id}`) ||
//         (instruction.a === `y${id}` && instruction.b === `x${id}`)) &&
//       instruction.operation === "AND"
//     );
//     const z = instructions.find((instruction) => instruction.c === `z${id}`);

//     if (xor1 === undefined || and1 === undefined || z === undefined) continue;

//     // each z must be connected to an XOR
//     if (z.operation !== "XOR") incorrect.push(z.c);

//     // each AND must go to an OR (besides the first case as it starts the carry flag)
//     const or = instructions.find((instruction) =>
//       instruction.a === and1.c || instruction.b === and1.c
//     );
//     if (or !== undefined && or.operation !== "OR" && i > 0) {
//       incorrect.push(and1.c);
//     }

//     // the first XOR must to go to XOR or AND
//     const after = instructions.find((instruction) =>
//       instruction.a === xor1.c || instruction.b === xor1.c
//     );
//     if (after !== undefined && after.operation === "OR") incorrect.push(xor1.c);
//   }

//   // each XOR must be connected to an x, y, or z
//   incorrect.push(
//     ...instructions.filter((instruction) =>
//       !instruction.a[0].match(/[xy]/g) && !instruction.b[0].match(/[xy]/g) &&
//       !instruction.c[0].match(/[z]/g) && instruction.operation === "XOR"
//     ).map((instruction) => instruction.c),
//   );

//   return incorrect.sort().join(",");
// }
