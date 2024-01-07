import combinations from "../../../../../lib/combinations.ts";
import type { Coordinates, Scanner } from "../../model.d.ts";

import { parseScanners } from "../../scannersParser.ts";

function* orientations(
  positions: Iterable<Coordinates>,
): IterableIterator<Set<Coordinates>> {
}

function calculateManhattanDistance(
  a: readonly number[],
  b: readonly number[],
) {
  const { length } = a;
  if (b.length !== length) throw new RangeError("input lengths differ");
  let result = 0;
  for (let i = 0; i < length; i++) result += Math.abs(a[i] - b[i]);
  return result;
}

function union<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): Set<T> {
  if (a.size > b.size) return union(b, a);
  return new Set([...a].filter((value) => b.has(value)));
}

function mergeScanners(scanners: Scanner[]): Scanner {
  let [result, ...rest] = scanners;
  while (rest.length) {
    for (const { positions } of rest) {
      for (const a of combinations(result.positions, 12)) {
        
        for (const b of combinations(positions, 12)) {
        }
      }
      for (const orientation of orientations(positions)) {
        const overlap = union(positions, orientation);
        if (overlap.size < 12) continue;
      }
    }
  }
  return result;
}

export default function solve(input: string) {
  const scanners = parseScanners(input);
}

// 389 is too low
