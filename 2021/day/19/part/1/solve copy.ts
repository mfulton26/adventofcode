import { Coordinates, Scanner } from "../../model.d.ts";
import { parseScanners } from "../../scannersParser.ts";

function createFingerprint(positions: Coordinates[]) {
  const result = new Set<string>();
  for (let i = 0; i < positions.length; i++) {
    const a = positions[i];
    for (let j = i + 1; j < positions.length; j++) {
      const b = positions[j];
      result.add(
        a.map((coordinate, index) => Math.abs(coordinate - b[index]))
          .sort((a, b) => a - b)
          .join(),
      );
    }
  }
  return result;
}

function createScannerFingerprints(scanners: Iterable<Scanner>) {
  const result = new Map<Scanner, Set<string>>();
  for (const scanner of scanners) {
    result.set(scanner, createFingerprint(scanner.positions));
  }
  return result;
}

function union<T>(a: readonly T[], b: readonly T[]): T[] {
  a = a.toSorted((a, b) => a === b ? 0 : a < b ? -1 : 1);
  b = b.toSorted((a, b) => a === b ? 0 : a < b ? -1 : 1);
  const result: T[] = [];
  for (
    let i = 0, j = 0, left = a[i], right = b[j];
    i < a.length && j < b.length;
    left <= right && i++, left >= right && j++, left = a[i], right = b[j]
  ) {
    if (left !== right) continue;
    result.push(right);
  }
  return result;
}

type Fingerprint = Map<string, Set<Coordinates>>;
const cache = new Map<Scanner, Fingerprint>();

function getFingerprint(scanner: Scanner) {
  if (!cache.has(scanner)) {
    const fingerprint = new Map<string, Set<Coordinates>>();
    const { positions } = scanner;
    for (let i = 0; i < positions.length; i++) {
      const a = positions[i];
      for (let j = i + 1; j < positions.length; j++) {
        const b = positions[j];
        fingerprint.set(
          a.map((coordinate, index) => Math.abs(coordinate - b[index]))
            .sort((a, b) => a - b)
            .join(),
          new Set([a, b]),
        );
      }
    }
    cache.set(scanner, fingerprint);
  }
  return cache.get(scanner)!;
}

function merge(a: Scanner, b: Scanner) {
  const overlappingFingerprintKeys = unionOfSets(
    new Set(getFingerprint(a).keys()),
    new Set(getFingerprint(b).keys()),
  );
  if (overlappingFingerprintKeys.size < 66) return;
  const result = new Map<Coordinates, Coordinates>();
  for (const key of overlappingFingerprintKeys) {
    const [nodeA, nodeB] = getFingerprint(a).get(key)!;
    result.set(nodeA, nodeB);
  }
}

export default function solve(input: string) {
  const scanners = parseScanners(input);
  const scannerFingerprints = createScannerFingerprints(scanners);
  const [scannerZero] = scanners;
  const otherScanners = new Set(scanners.slice(1));
  let overlapping = 0;
  while (otherScanners.size) {
    for (const otherScanner of otherScanners) {
      const { size } = unionOfSets(
        scannerFingerprints.get(scannerZero)!,
        scannerFingerprints.get(otherScanner)!,
      );
      if (size < 66) continue;
      otherScanners.delete(otherScanner);
      // if (length >= 91) overlapping += 14;
      // else if (length >= 78) overlapping += 13;
      // else overlapping += 12;
      overlapping += 12;
      break;
    }
  }
  // let overlapping = 0;
  // for (let i = 0; i < scanners.length; i++) {
  //   const a = scanners[i];
  //   for (let j = i + 1; j < scanners.length; j++) {
  //     const b = scanners[j];
  //     const { size } = setUnion(
  //       scannerFingerprints.get(a)!,
  //       scannerFingerprints.get(b)!,
  //     );
  //     if (size < 66) continue;
  //     scanners.splice(j--, 1);
  //     // if (length >= 91) overlapping += 14;
  //     // else if (length >= 78) overlapping += 13;
  //     // else overlapping += 12;
  //     overlapping += 12;
  //   }
  // }
  return scanners.reduce(
    (count, { positions: { length } }) => count + length,
    0,
  ) - overlapping;
}

function unionOfSets<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): Set<T> {
  if (a.size > b.size) return unionOfSets(b, a);
  return new Set([...a].filter((value) => b.has(value)));
}

// 389 is too low
