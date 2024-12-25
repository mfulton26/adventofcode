export default function solve(input: string, { size = 5 } = {}) {
  const locks: number[][] = [];
  const keys: number[][] = [];
  for (const schematic of input.split("\n\n")) {
    const rows = schematic.split("\n").slice(1, -1);
    const heights = Array.from(
      { length: size },
      (_, x) => rows.reduce((height, row) => height + +(row[x] === "#"), 0),
    );
    (schematic[0] === "#" ? locks : keys).push(heights);
  }
  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (key.every((height, index) => height + lock[index] <= size)) count++;
    }
  }
  return count;
}
