export default function solve(input: string) {
  const rows = input.split("\n").map((line) => [...line]);
  let count = 0;
  for (let x = 0, y = 0; y < rows.length; x += 3, y += 1) {
    const row = rows[y];
    const location = row[x % row.length];
    if (location !== "#") continue;
    count++;
  }
  return count;
}
