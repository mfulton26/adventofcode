export default function solve(input: string) {
  const carrying: number[] = [];
  for (const paragraph of input.split("\n\n")) {
    let sum = 0;
    for (const line of paragraph.split("\n")) sum += Number(line);
    carrying.push(sum);
  }
  let totalCalories = 0;
  for (const calories of carrying.sort((a, b) => a - b).slice(-3)) {
    totalCalories += calories;
  }
  return totalCalories;
}
