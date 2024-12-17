const moveToDir = { "^": [0, -1], "v": [0, 1], "<": [-1, 0], ">": [1, 0] };

export default function solve(input: string) {
  const [top, bottom] = input.split("\n\n");
  const grid = top.split("\n").map((line) => [...line]);
  const moves = bottom.replaceAll("\n", "");
  let py = grid.findIndex((row) => row.includes("@")),
    px = grid[py].indexOf("@");
  function swap(x1: number, y1: number, x2: number, y2: number) {
    [grid[y1][x1], grid[y2][x2]] = [grid[y2][x2], grid[y1][x1]];
  }
  for (const move of moves) {
    const [dx, dy] = moveToDir[move as keyof typeof moveToDir];
    let canMove = false, [wx, wy] = [px + dx, py + dy];
    while (grid[wy][wx] !== "#") {
      canMove ||= grid[wy][wx] === ".", wx += dx, wy += dy;
    }
    if (!canMove) continue;
    let d = 0;
    while (grid[py + (d + 1) * dy][px + (d + 1) * dx] !== ".") d++;
    for (; d; d--) {
      swap(px + d * dx, py + d * dy, px + (d + 1) * dx, py + (d + 1) * dy);
    }
    swap(px, py, px + dx, py + dy);
    px += dx, py += dy;
  }
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "O") sum += 100 * y + x;
    }
  }
  return sum;
}
