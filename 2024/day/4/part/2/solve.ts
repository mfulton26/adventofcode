const directions = [[1, 1], [1, -1]];

export default function solve(input: string) {
  const grid = input.split("\n").map((line) => Array.from(line));
  const { length: height, 0: { length: width } } = grid;
  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] !== "A") continue;
      const matches = grid[y][x] === "A" &&
        directions.every(([dx, dy]) =>
          [grid[y + dy]?.[x + dx], grid[y - dy]?.[x - dx]].sort()
            .join("") === "MS"
        );
      if (matches) count++;
    }
  }
  return count;
}
