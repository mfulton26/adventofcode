export default function solve(input: string) {
  const centralPoint = [0, 0] as const;
  const paths = parsePaths(input);
  const intersections = findIntersections(centralPoint, paths);
  const fewestCombinedStepCounts = intersections.map(({ stepCountsByPath }) =>
    Array.from(stepCountsByPath.values())
      .sort()
      .slice(0, 2)
      .reduce((sum, value) => sum + value, 0)
  );
  return Math.min(...fewestCombinedStepCounts);
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
  const intersections: {
    point: [number, number];
    stepCountsByPath: Map<Path, number>;
  }[] = [];
  const grid = new Map<number, Map<number, Map<Path, number>>>();
  for (const path of paths) {
    let [x, y] = centralPoint;
    let stepCount = 0;
    for (const [[dx, dy], amount] of path) {
      for (let i = 0; i < amount; i++) {
        x += dx, y += dy, stepCount++;
        if (!grid.has(y)) grid.set(y, new Map<number, Map<Path, number>>());
        const row = grid.get(y)!;
        if (!row.has(x)) row.set(x, new Map<Path, number>());
        const stepCountsByPath = row.get(x)!;
        if (stepCountsByPath.has(path)) continue;
        stepCountsByPath.set(path, stepCount);
        if (stepCountsByPath.size !== 2) continue;
        intersections.push({ point: [x, y], stepCountsByPath });
      }
    }
  }
  return intersections;
}
