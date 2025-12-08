import { calculateDistances } from "../../distances.ts";

export default function solve(input: string) {
  const boxes = input.split("\n").map((line) => line.split(",").map(Number));
  const boxToCircuit = new Map(boxes.map((box) => [box, new Set([box])]));
  const circuits = new Set(boxToCircuit.values());
  const stack = Array.from(calculateDistances(boxes)).sort(([a], [b]) => b - a);
  while (circuits.size > 1) {
    const [, [boxA, boxB]] = stack.pop()!;
    const circuitA = boxToCircuit.get(boxA)!;
    const circuitB = boxToCircuit.get(boxB)!;
    if (circuitA === circuitB) continue;
    circuits.delete(circuitA);
    circuits.delete(circuitB);
    const circuit = circuitA.union(circuitB);
    for (const box of circuit) boxToCircuit.set(box, circuit);
    circuits.add(circuit);
    if (circuits.size === 1) return boxA[0] * boxB[0];
  }
}
