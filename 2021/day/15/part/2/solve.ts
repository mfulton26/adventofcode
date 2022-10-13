export default function solve(input: string) {
  const levels = (() => {
    const levels = input.split("\n").map((line) => Array.from(line, Number));
    return [...Array(5).keys()].flatMap((m) =>
      levels.map((row) =>
        [...Array(5).keys()].flatMap((n) =>
          row.map((level) => (level + m + n - 1) % 9 + 1)
        )
      )
    );
  })();
  const costs = Array.from(levels, (row) => Array.from(row));
  costs[0][0] = 0;
  for (let i = 1; i < costs.length; i++) {
    for (let j = 0; j <= i; j++) {
      for (const [x, y] of i === j ? [[i, j]] : [[i, j], [j, i]]) {
        const leftCost: number | undefined = costs[y]?.[x - 1];
        const topCost: number | undefined = costs[y - 1]?.[x];
        if (leftCost === undefined || topCost === undefined) {
          costs[y][x] += leftCost ?? topCost;
          continue;
        }
        const cost = costs[y][x] += Math.min(leftCost, topCost);
        const stack = [[cost, x - 1, y] as const, [cost, x, y - 1] as const];
        while (stack.length) {
          const [prevCost, x, y] = stack.pop()!;
          const level = levels[y]?.[x];
          if (level === undefined) continue;
          const cost = prevCost + level;
          if (cost >= costs[y][x]) continue;
          costs[y][x] = cost;
          stack.push(
            [cost, x + 1, y],
            [cost, x, y + 1],
            [cost, x - 1, y],
            [cost, x, y - 1],
          );
        }
      }
    }
  }
  return costs[levels.length - 1][levels.length - 1];
}
