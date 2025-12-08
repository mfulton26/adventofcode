import calculateSingleLineDistance from "@lib/calculateSingleLineDistance.ts";

export function calculateDistances(boxes: number[][]) {
  const distances = new Map<number, Set<(typeof boxes)[number]>>();
  for (let i = 0; i < boxes.length; i++) {
    const a = boxes[i];
    for (let j = i + 1; j < boxes.length; j++) {
      const b = boxes[j];
      const distance = Math.abs(calculateSingleLineDistance(a, b));
      distances.set(distance, new Set([a, b]));
    }
  }
  return distances;
}
