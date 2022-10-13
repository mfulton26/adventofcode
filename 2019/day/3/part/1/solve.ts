export default function solve(input: string) {
  const centralPoint = [0, 0] as const;
  const paths = parsePaths(input);
  const intersections = findIntersections(centralPoint, paths);
  const manhattanDistances = intersections.map(({ point }) =>
    calculateManhattanDistance(centralPoint, point)
  );
  return Math.min(...manhattanDistances);
}

type Path = ([[number, number], number])[];

export function parsePaths(text: string): Path[] {
  const directionsByChar: Record<string, [number, number]> = {
    R: [+1, 0],
    L: [-1, 0],
    U: [0, +1],
    D: [0, -1],
  };
  return text.split("\n").map((line) =>
    line.split(",").map((segment) => [
      directionsByChar[segment[0]],
      Number(segment.slice(1)),
    ])
  );
}

function findIntersections(
  centralPoint: readonly [number, number],
  paths: Path[],
) {
  const intersections: { point: [number, number]; paths: Set<Path> }[] = [];
  const grid = new Map<number, Map<number, Set<Path>>>();
  for (const path of paths) {
    let [x, y] = centralPoint;
    for (const [[dx, dy], amount] of path) {
      for (let i = 0; i < amount; i++) {
        x += dx, y += dy;
        if (!grid.has(y)) grid.set(y, new Map<number, Set<Path>>());
        const row = grid.get(y)!;
        if (!row.has(x)) row.set(x, new Set<Path>());
        const intersectingPaths = row.get(x)!;
        if (intersectingPaths.has(path)) continue;
        intersectingPaths.add(path);
        if (intersectingPaths.size !== 2) continue;
        intersections.push({ point: [x, y], paths: intersectingPaths });
      }
    }
  }
  return intersections;
}

function calculateManhattanDistance(
  a: readonly number[],
  b: readonly number[],
) {
  let result = 0;
  for (let i = 0; i < a.length; i++) result += Math.abs(a[i] - b[i]);
  return result;
}
