export default function solve(input: string) {
  const [row, column] = Array.from(input.matchAll(/\d+/g), Number);
  const n = (row + column - 2) * (row + column - 1) / 2 + column;
  let code = 20151125;
  for (let m = 1; m < n; m++) code = code * 252533 % 33554393;
  return code;
}
