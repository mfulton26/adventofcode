export function solve(input) {
  const rows = input.split("\n").map((line) => Array.from(line));
  let count = 0;
  for (let x = 0, y = 0; y < rows.length; x += 3, y += 1) {
    const row = rows[y];
    const location = row[x % row.length];
    const isTree = location === "#";
    if (isTree) {
      count++;
    }
  }
  return count;
}
