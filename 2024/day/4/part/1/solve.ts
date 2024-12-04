const directions = Array.from({ length: 8 }, (_, k) => Math.PI * k / 4)
  .map((angle) => [Math.round(Math.cos(angle)), Math.round(Math.sin(angle))]);

export default function solve(input: string) {
  const grid = input.split("\n").map((line) => Array.from(line));
  const { length: height, 0: { length: width } } = grid;
  let count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (const [dx, dy] of directions) {
        const matches = Array.from("XMAS")
          .every((letter, i) => letter === grid[y + i * dy]?.[x + i * dx]);
        if (matches) count++;
      }
    }
  }
  return count;
}
