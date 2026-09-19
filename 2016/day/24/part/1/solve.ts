export default function solve(input: string) {
  const map = input.split("\n").map((line) => [...line]);
  const locations = parseLocations(map);
  const nodes = [...locations.keys()].sort((a, b) => a - b);
  const indexByCell = new Map(nodes.map((node, index) => [node, index]));
  const distances = computeDistances(map, locations, nodes, indexByCell);
  const startIndex = indexByCell.get(0)!;

  return solveSubsetDP(distances, startIndex);
}

function parseLocations(map: string[][]) {
  const locations = new Map<number, { x: number; y: number }>();
  for (const [y, row] of map.entries()) {
    for (const [x, cell] of row.entries()) {
      if (cell === "#" || cell === ".") continue;
      locations.set(+cell, { x, y });
    }
  }
  return locations;
}

function computeDistances(
  map: string[][],
  locations: Map<number, { x: number; y: number }>,
  nodes: number[],
  indexByCell: Map<number, number>,
) {
  const distances = nodes.map(() => nodes.map(() => Number.POSITIVE_INFINITY));
  for (let startIndex = 0; startIndex < nodes.length; startIndex++) {
    distances[startIndex][startIndex] = 0;
    const start = nodes[startIndex];
    const { x, y } = locations.get(start)!;
    const queue = [{ x, y, steps: 0 }];
    const seen = new Set([`${x},${y}`]);
    while (queue.length) {
      const { x, y, steps } = queue.shift()!;
      for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
        const nx = x + dx, ny = y + dy;
        const key = `${nx},${ny}`;
        const cell = map[ny][nx];
        if (cell === "#" || seen.has(key)) continue;
        seen.add(key);
        const nextSteps = steps + 1;
        queue.push({ x: nx, y: ny, steps: nextSteps });
        if (cell === ".") continue;
        const targetIndex = indexByCell.get(+cell);
        if (targetIndex === undefined) continue;
        distances[startIndex][targetIndex] = Math.min(
          distances[startIndex][targetIndex],
          nextSteps,
        );
      }
    }
  }
  return distances;
}

function solveSubsetDP(distances: number[][], startIndex: number) {
  const nodeCount = distances.length;
  const fullMask = (1 << nodeCount) - 1;
  const dp = Array.from(
    { length: 1 << nodeCount },
    () => Array.from({ length: nodeCount }, () => Number.POSITIVE_INFINITY),
  );
  dp[1 << startIndex][startIndex] = 0;
  const queue = [[1 << startIndex, startIndex] as const];
  while (queue.length) {
    const [mask, last] = queue.shift()!;
    const cost = dp[mask][last];
    for (let next = 0; next < nodeCount; next++) {
      if (next === last || (mask & (1 << next)) !== 0) continue;
      const nextMask = mask | (1 << next);
      const nextCost = cost + distances[last][next];
      if (nextCost >= dp[nextMask][next]) continue;
      dp[nextMask][next] = nextCost;
      queue.push([nextMask, next]);
    }
  }
  let best = Number.POSITIVE_INFINITY;
  for (let mask = 0; mask < dp.length; mask++) {
    if (mask !== fullMask) continue;
    for (let last = 0; last < nodeCount; last++) {
      best = Math.min(best, dp[mask][last]);
    }
  }
  return best;
}
