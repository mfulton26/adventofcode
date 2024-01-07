export default function solve(input: string) {
  let max = -Infinity;
  for (const paragraph of input.split("\n\n")) {
    let sum = 0;
    for (const line of paragraph.split("\n")) sum += Number(line);
    if (sum > max) max = sum;
  }
  return max;
}
