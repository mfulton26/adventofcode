export default function solve(input: string) {
  const records = input.split("\n").map((line) => line.split(" ").map(Number));
  return records.filter(isSafe).length;
}

function isSafe(levels: number[]) {
  const direction = Math.sign(levels[1] - levels[0]);
  for (let i = 0, j = 1; j < levels.length; i++, j++) {
    const diff = levels[j] - levels[i];
    if (Math.sign(diff) !== direction || Math.abs(diff) > 3) return false;
  }
  return true;
}
