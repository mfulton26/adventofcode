export default function solve(input: string) {
  const positions = input.split(",").map(Number);
  function findCostAt(target: number): number {
    let result = 0;
    for (const position of positions) {
      result += Math.abs(target - position);
    }
    return result;
  }
  const mean = positions.reduce((sum, position) => sum + position, 0) /
    positions.length;
  return Math.min(
    findCostAt(Math.floor(mean)),
    findCostAt(Math.ceil(mean)),
  );
}
