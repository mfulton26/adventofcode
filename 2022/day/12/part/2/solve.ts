import type { Position } from "../../model.d.ts";

import { parseInput } from "../../input.ts";

export default function solve(input: string) {
  const { targetPosition, heightMap } = parseInput(input);
  const visited = new Set<Position>();
  const queue: { position: Position; stepCount: number }[] = [];
  for (const [position, height] of heightMap) {
    if (height > 0) continue;
    queue.push({ position, stepCount: 0 });
  }
  while (queue.length) {
    const { position, stepCount } = queue.shift()!;
    if (visited.has(position)) continue;
    visited.add(position);
    if (position == targetPosition) return stepCount;
    const height = heightMap.get(position)!;
    for (const neighborPosition of heightMap.neighborKeys(position)) {
      const neighborHeight = heightMap.get(neighborPosition)!;
      if (neighborHeight > height + 1) continue;
      queue.push({ position: neighborPosition, stepCount: stepCount + 1 });
    }
  }
}
