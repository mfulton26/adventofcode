export default function solve(input: string) {
  const depths = input.split("\n").map(Number);
  let count = 0;
  for (let i = 0, j = 3; j < depths.length; i++, j++) {
    if (depths[j] > depths[i]) count++;
  }
  return count;
}
