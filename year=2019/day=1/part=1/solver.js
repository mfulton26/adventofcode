export function solve(input) {
  let sum = 0;
  for (const line of input.split("\n")) {
    const mass = Number(line);
    sum += calculateFuelRequired(mass);
  }
  return sum;
}

function calculateFuelRequired(mass) {
  return Math.trunc(mass / 3) - 2;
}
