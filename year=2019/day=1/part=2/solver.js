/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let sum = 0;
  for (const line of input.split("\n")) {
    const mass = Number(line);
    sum += calculateFuelRequired(mass);
  }
  return sum;
}

/**
 * @param {number} mass
 * @returns {number}
 */
function calculateFuelRequired(mass) {
  if (mass < 9) {
    return 0;
  }
  const fuelRequired = Math.trunc(mass / 3) - 2;
  return fuelRequired + calculateFuelRequired(fuelRequired);
}
