export default function solve(input: string, { rows = 40 } = {}) {
  let count = 0;
  let row = Array.from(input, (char) => char === "^");
  for (const isTrap of row) if (!isTrap) count++;
  for (let rowIndex = 1; rowIndex < rows; rowIndex++) {
    row = row.map((_, i) => !row[i - 1] !== !row[i + 1]);
    for (const isTrap of row) if (!isTrap) count++;
  }
  return count;
}
