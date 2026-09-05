export default function solve(input: string) {
  const favoriteNumber = +input;
  const isWall = (x: number, y: number) =>
    bitCount(x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber) % 2 === 1;
  const queue = [{ x: 1, y: 1, steps: 0 }];
  const directions = [[0, -1], [-1, 0], [1, 0], [0, 1]] as const;
  const visited = new Set<string>();
  while (queue.length) {
    const { x, y, steps } = queue.shift()!;
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (steps >= 50) continue;
    for (const [dx, dy] of directions) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0) continue;
      if (isWall(nx, ny)) continue;
      queue.push({ x: nx, y: ny, steps: steps + 1 });
    }
  }
  return visited.size;
}

function bitCount(value: number) {
  let count = 0;
  for (; value > 0; count++) value &= value - 1; // Clears the lowest set bit
  return count;
}
