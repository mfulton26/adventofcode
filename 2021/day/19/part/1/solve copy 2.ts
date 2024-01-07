import { Coordinates, Scanner } from "../../model.d.ts";
import { parseScanners } from "../../scannersParser.ts";

// function* positionOrientation

function calculateManhattanDistance(
  a: readonly number[],
  b: readonly number[],
) {
  if (a.length !== b.length) throw new RangeError("input lengths differ");
  let result = 0;
  for (let i = 0; i < a.length; i++) result += Math.abs(a[i] - b[i]);
  return result;
}

function mergeScanners(scanners: Scanner[]): Scanner {
  const scannerDistances = new Map<Scanner, number[]>();
  for (const scanner of scanners) {
    const { positions } = scanner;
    const distances = [] as number[];
    for (let i = 0; i < positions.length; i++) {
      const a = positions[i];
      for (let j = i + 1; j < positions.length; j++) {
        const b = positions[j];
        const distance = calculateManhattanDistance(a, b);
        distances.push(distance);
      }
    }
    scannerDistances.set(scanner, distances);
  }
  let [result, ...rest] = scanners;
  while (rest.length) {
    for (const scanner of rest) {
    }
  }
  return result;
}

export default function solve(input: string) {
  const scanners = parseScanners(input);
}

// 389 is too low
