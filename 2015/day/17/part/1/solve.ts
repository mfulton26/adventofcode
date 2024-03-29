export default function solve(input: string, { target = 150 } = {}) {
  const capacities = parseCapacities(input);
  const combinationsCount = 2 ** capacities.length;
  let count = 0;
  for (let combination = 0; combination < combinationsCount; combination++) {
    const capacity = findCapacity(capacities, combination);
    if (capacity === target) {
      count++;
    }
  }
  return count;
}

function parseCapacities(text: string) {
  return text.split("\n").map(Number);
}

function findCapacity(capacities: number[], combination: number) {
  let capacity = 0;
  for (let bit = 0; bit < capacities.length; bit++) {
    if (combination & (1 << bit)) {
      capacity += capacities[bit];
    }
  }
  return capacity;
}
