export default function solve(input: string) {
  const locks: number[][] = [];
  const keys: number[][] = [];
  for (const lines of input.split("\n\n")) {
    const rows = lines.split("\n").slice(1, -1);
    const heights = Array.from(rows[0], () => 0);
    if (lines.startsWith(".")) rows.reverse();
    for (let x = 0; x < rows[0].length; x++) {
      for (let height = rows.length; height > 0; height--) {
        if (rows[height - 1][x] === ".") continue;
        heights[x] = height;
        break;
      }
    }
    if (lines.startsWith("#")) locks.push(heights);
    else keys.push(heights);
  }
  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (
        key.every((height, index, { length: max }) =>
          height + lock[index] <= max
        )
      ) count++;
    }
  }
  return count;
}
