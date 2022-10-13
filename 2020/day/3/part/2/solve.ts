const directions = [
  { dx: 1, dy: 1 },
  { dx: 3, dy: 1 },
  { dx: 5, dy: 1 },
  { dx: 7, dy: 1 },
  { dx: 1, dy: 2 },
];

export default function solve(input: string) {
  const rows = input.split("\n").map((line) => [...line]);
  return directions
    .map((direction) => countTrees(rows, direction))
    .reduce((product, count) => product * count);
}

function countTrees(rows: string[][], { dx, dy }: { dx: number; dy: number }) {
  let count = 0;
  for (let x = 0, y = 0; y < rows.length; x += dx, y += dy) {
    const row = rows[y];
    const location = row[x % row.length];
    if (location !== "#") continue;
    count++;
  }
  return count;
}
