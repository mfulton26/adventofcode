import combinations from "../../../../../lib/combinations.ts";
import CoordinateVector from "../../CoordinateVector.ts";
import type { Coordinates, Distance, Scanner } from "../../model.d.ts";

import { parseScanners } from "../../scannersParser.ts";

class ValueGraph<N, V> {
  #nodes = new Set<N>();
  #edgeValues = new Map<N, Map<N, V>>();
  #edges = new Map<[N, N], V>();

  add(node: N) {
    this.#nodes.add(node);
    return this;
  }

  set(nodeU: N, nodeV: N, value: V) {
    this.add(nodeU);
    this.add(nodeV);
    this.#edgeValues.get(nodeU)?.set(nodeV, value) ??
      this.#edgeValues.set(nodeU, new Map<N, V>([[nodeV, value]]));
    return this;
  }

  delete(node: N): boolean;
  delete(nodeU: N, nodeV: N): boolean;
  delete(...args: [N] | [N, N]) {
    if (args.length === 1) {
      const [node] = args;
    }
    return true;
  }

  *nodes(): IterableIterator<N> {
    yield* this.#nodes;
  }
}

function* orientations(
  positions: Iterable<Coordinates>,
): IterableIterator<Set<Coordinates>> {
  for (const rotator of rotators) {
    yield new Set(Array.from(positions, rotator));
  }
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
  const edges = new Map<[Coordinates, Coordinates], Distance>();
  for (const [nodeU, nodeV] of combinations(result.positions, 2)) {
    edges.set(CoordinateVector([nodeU, nodeV]), [
      nodeU[0] - nodeV[0],
      nodeU[1] - nodeV[1],
      nodeU[2] - nodeV[2],
    ]);
  }
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

function* rotations([x, y, z]: Coordinates): IterableIterator<Coordinates> {
  yield [x, y, z];
  yield [y, -x, z];
  yield [y, -z, -x];
  yield [z, y, -x];
  yield [z, x, y];
  yield [x, -z, y];
  yield [x, -y, -z];
  yield [y, x, -z];
  yield [y, z, x];
  yield [z, -y, x];
  yield [z, -x, -y];
  yield [x, z, -y];
}

const rotators2: ((coordinates: Coordinates) => Coordinates)[] = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [x, z, -y],
];

export default function solve(input: string) {
  const scanners = parseScanners(input);
  return NaN;
}

// 389 is too low

function roll([x, y, z]: Coordinates): Coordinates {
  return [x, z, -y];
}
function turnCounterclockwise([x, y, z]: Coordinates): Coordinates {
  return [-y, x, z];
}
function turnClockwise([x, y, z]: Coordinates): Coordinates {
  return [y, -x, z];
}

type Rotator = (coordinates: Coordinates) => Coordinates;
const rotators: Rotator[] = Array.from({ length: 3 }).flatMap(
  () => [roll, turnClockwise, roll, turnCounterclockwise],
);
