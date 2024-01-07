export default function solve(input: string) {
  const grid = input.split("\n").map((line) => Array.from(line, Number));
  const { 0: { length: width }, length: height } = grid;
  function countLeft(r: number, c: number) {
    for (let _c = c - 1; _c >= 0; _c--) {
      if (grid[r][_c] >= grid[r][c]) return c - _c;
    }
    return c;
  }
  function countRight(r: number, c: number) {
    for (let _c = c + 1; _c < width; _c++) {
      if (grid[r][_c] >= grid[r][c]) return _c - c;
    }
    return width - c - 1;
  }
  function countUp(r: number, c: number) {
    for (let _r = r - 1; _r >= 0; _r--) {
      if (grid[_r][c] >= grid[r][c]) return r - _r;
    }
    return r;
  }
  function countDown(r: number, c: number) {
    for (let _r = r + 1; _r < height; _r++) {
      if (grid[_r][c] >= grid[r][c]) return _r - r;
    }
    return height - r - 1;
  }
  function calculateScenicScore(r: number, c: number) {
    return countLeft(r, c) * countRight(r, c) * countUp(r, c) * countDown(r, c);
  }
  let max = -Infinity;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const scenicScore = calculateScenicScore(r, c);
      if (scenicScore > max) max = scenicScore;
    }
  }
  return max;
}
