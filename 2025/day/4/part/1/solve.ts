// deno-fmt-ignore
const directions = [
  [-1, -1], [ 0, -1], [ 1, -1],
  [-1,  0],           [ 1,  0],
  [-1,  1], [ 0,  1], [ 1,  1],
];

export default function solve(input: string) {
  const grid = input.split("\n").map((line) => Array.from(line));
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== "@") continue;
      const { length: adjacentCount } = directions.filter(([dx, dy]) =>
        grid[y + dy]?.[x + dx] === "@"
      );
      if (adjacentCount < 4) count++;
    }
  }
  return count;
}
