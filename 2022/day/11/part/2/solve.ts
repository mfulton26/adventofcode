import { parse } from "../../notes.ts";

export default function solve(input: string) {
  const { monkeys } = parse(input);
  const inspectionCounts = monkeys.map(() => 0);
  const multiple = monkeys.reduce(
    (product, { divisibleBy }) => product * divisibleBy,
    1n,
  );
  for (let i = 0; i < 10000; i++) {
    for (
      const {
        id,
        startingItems: queue,
        operation,
        divisibleBy,
        throwIfTrueId,
        throwIfFalseId,
      } of monkeys
    ) {
      while (queue.length) {
        const item = queue.shift()!;
        const newItem = operation(item) % multiple;
        inspectionCounts[id]++;
        const throwId = newItem % divisibleBy === 0n
          ? throwIfTrueId
          : throwIfFalseId;
        monkeys[throwId].startingItems.push(newItem);
      }
    }
  }
  inspectionCounts.sort((a, b) => b - a);
  return inspectionCounts[0] * inspectionCounts[1];
}
