export default function solve(input: string) {
  const grid = input.split("\n").map((line) => Array.from(line, Number));
  const { 0: { length: width }, length: height } = grid;
  function isVisibleLeft(r: number, c: number) {
    for (let _c = c - 1; _c >= 0; _c--) {
      if (grid[r][_c] >= grid[r][c]) return false;
    }
    return true;
  }
  function isVisibleRight(r: number, c: number) {
    for (let _c = c + 1; _c < width; _c++) {
      if (grid[r][_c] >= grid[r][c]) return false;
    }
    return true;
  }
  function isVisibleUp(r: number, c: number) {
    for (let _r = r - 1; _r >= 0; _r--) {
      if (grid[_r][c] >= grid[r][c]) return false;
    }
    return true;
  }
  function isVisibleDown(r: number, c: number) {
    for (let _r = r + 1; _r < height; _r++) {
      if (grid[_r][c] >= grid[r][c]) return false;
    }
    return true;
  }
  function isVisible(r: number, c: number) {
    return isVisibleLeft(r, c) || isVisibleRight(r, c) || isVisibleUp(r, c) ||
      isVisibleDown(r, c);
  }
  let count = 0;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (isVisible(r, c)) count++;
    }
  }
  return count;
}
