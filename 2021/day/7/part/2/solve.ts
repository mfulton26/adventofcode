export default function solve(input: string) {
  const positions = input.trim().split(",").map(Number).sort((a, b) => a - b);
  const min = positions[0], max = positions[positions.length - 1];
  let minFuel = Infinity;
  for (let a = min; a <= max; a++) {
    const fuel = positions.reduce((sum, b) => {
      const n = Math.abs(a - b);
      const cost = (n * (n + 1)) / 2;
      return sum + cost;
    }, 0);
    if (fuel < minFuel) minFuel = fuel;
  }
  return minFuel;
}
