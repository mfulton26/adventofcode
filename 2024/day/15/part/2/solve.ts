const moveToDxDy = { "^": [0, -1], "v": [0, 1], "<": [-1, 0], ">": [1, 0] };

export default function solve(input: string) {
  const [top, bottom] = input.split("\n\n");
  const grid = top.replaceAll(".", "..").replaceAll("O", "[]")
    .replaceAll("#", "##").replaceAll("@", "@.")
    .split("\n").map((line) => [...line]);
  const moves = bottom.replaceAll("\n", "");
  let py = grid.findIndex((row) => row.includes("@")),
    px = grid[py].indexOf("@");
  function swap(x1: number, y1: number, x2: number, y2: number) {
    [grid[y1][x1], grid[y2][x2]] = [grid[y2][x2], grid[y1][x1]];
  }
  for (const move of moves) {
    const [dx, dy] = moveToDxDy[move as keyof typeof moveToDxDy];
    const toMove: [number, number][] = [];
    const queue = [[px, py]];
    const seen = new Set();
    while (queue.length) {
      const [x, y] = queue.shift()!;
      const hash = `${x},${y}`;
      if (seen.has(hash)) continue;
      seen.add(hash);
      if (["#", "."].includes(grid[y][x])) continue;
      toMove.push([x, y]);
      queue.push([x + dx, y + dy]);
      if (grid[y][x] === "@") continue;
      queue.push([x + (grid[y][x] === "[" ? 1 : -1), y]);
    }
    const canMove = toMove.every(([x, y]) => grid[y + dy][x + dx] !== "#");
    if (!canMove) continue;
    for (const [x, y] of toMove.reverse()) swap(x + dx, y + dy, x, y);
    px += dx, py += dy;
  }
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "[") sum += 100 * y + x;
    }
  }
  return sum;
}
