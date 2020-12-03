const directions = [
  { dx: 1, dy: 1 },
  { dx: 3, dy: 1 },
  { dx: 5, dy: 1 },
  { dx: 7, dy: 1 },
  { dx: 1, dy: 2 },
];

export function solve(input) {
  const rows = input.split("\n").map((line) => Array.from(line));
  return directions
    .map((direction) => countTrees(rows, direction))
    .reduce((product, count) => product * count);
}

function countTrees(rows, { dx, dy }) {
  let count = 0;
  for (let x = 0, y = 0; y < rows.length; x += dx, y += dy) {
    const row = rows[y];
    const location = row[x % row.length];
    const isTree = location === "#";
    if (isTree) {
      count++;
    }
  }
  return count;
}
