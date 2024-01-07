// Adapted from https://github.com/hiimjustin000/advent-of-code/blob/master/2023/day12/part1.js

function countArrangements(conditions: string, counts: number[]): number {
  if (counts.length === 0) return conditions.includes("#") ? 0 : 1;
  if (conditions.length < counts.reduce((a, b) => a + b + 1)) return 0;
  const [count] = counts;
  if (conditions.length === count) return conditions.includes(".") ? 0 : 1;
  let result = 0;
  if (conditions[0] !== "#") {
    result += countArrangements(conditions.slice(1), counts);
  }
  if (!conditions.slice(0, count).includes(".") && conditions[count] !== "#") {
    result += countArrangements(conditions.slice(count + 1), counts.slice(1));
  }
  return result;
}

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => {
      const [conditions, countsText] = line.split(" ");
      const counts = countsText.split(",").map(Number);
      return { conditions, counts };
    })
    .map(({ conditions, counts }) => countArrangements(conditions, counts))
    .reduce((sum, count) => sum + count, 0);
}
