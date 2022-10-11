export default function solve(input: string) {
  let sum = 0;
  for (const line of input.split("\n")) {
    const mass = Number(line);
    sum += calculateFuelRequired(mass);
  }
  return sum;
}

function calculateFuelRequired(mass: number): number {
  if (mass < 9) return 0;
  const fuelRequired = Math.trunc(mass / 3) - 2;
  return fuelRequired + calculateFuelRequired(fuelRequired);
}
