const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function findLeastTimeToExit(
  locations: readonly number[][],
  size: number,
  bytes: number,
) {
  const grid = Array.from(
    { length: size },
    () => Array.from({ length: size }),
  );
  for (let byte = 0; byte < bytes; byte++) {
    const [x, y] = locations[byte];
    grid[y][x] = "#";
  }
  const xf = size - 1, yf = xf;
  const queue = [[0, 0, 0]];
  const seen = new Set<`${number},${number}`>();
  while (queue.length) {
    const [x, y, t] = queue.shift()!;
    if (!(y in grid) || !(x in grid[y]) || grid[y][x] === "#") continue;
    if (x === xf && y === yf) return t;
    const hash = `${x},${y}` as const;
    if (seen.has(hash)) continue;
    seen.add(hash);
    for (const [dx, dy] of directions) queue.push([x + dx, y + dy, t + 1]);
  }
}

export default function solve(input: string, { size = 71, bytes = 1024 } = {}) {
  const locations = input.split("\n")
    .map((line) => line.split(",").map(Number));
  return findLeastTimeToExit(locations, size, bytes);
}
