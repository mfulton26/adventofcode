import { calculateDistances } from "../../distances.ts";

export default function solve(input: string, { connect = 1000 } = {}) {
  const boxes = input.split("\n").map((line) => line.split(",").map(Number));
  const boxToCircuit = new Map(boxes.map((box) => [box, new Set([box])]));
  const stack = Array.from(calculateDistances(boxes)).sort(([a], [b]) => b - a);
  for (let n = 0; n < connect; n++) {
    const [, [boxA, boxB]] = stack.pop()!;
    const circuitA = boxToCircuit.get(boxA)!;
    const circuitB = boxToCircuit.get(boxB)!;
    if (circuitA === circuitB) continue;
    const circuit = circuitA.union(circuitB);
    for (const box of circuit) boxToCircuit.set(box, circuit);
  }
  const circuits = new Set(boxToCircuit.values());
  return Array.from(circuits, ({ size }) => size)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => product * size, 1);
}
