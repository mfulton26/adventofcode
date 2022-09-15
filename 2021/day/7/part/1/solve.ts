export default function solve(input: string) {
  const positions = input.split(",").map(Number);
  function findCostAt(target: number): number {
    let result = 0;
    for (const position of positions) {
      result += Math.abs(target - position);
    }
    return result;
  }
  positions.sort((a, b) => a - b);
  const indexOfMedian = positions.length / 2;
  return Math.min(
    findCostAt(positions[Math.floor(indexOfMedian)]),
    findCostAt(positions[Math.ceil(indexOfMedian)]),
  );
}
