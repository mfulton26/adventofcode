export default function solve(input: string) {
  return input.split("\n")
    .map((line) => line.trim().split(/ +/).map(Number))
    .map((_, rowIndex, rows) => {
      const columnIndex = rowIndex % 3;
      const start = rowIndex - columnIndex;
      return [
        rows[start][columnIndex],
        rows[start + 1][columnIndex],
        rows[start + 2][columnIndex],
      ];
    })
    .map((tuple) => tuple.sort((a, b) => a - b))
    .filter(([a, b, c]) => a + b > c)
    .length;
}
