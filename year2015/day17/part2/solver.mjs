export function solve(input, { target = 150 } = {}) {
  const capacities = parseCapacities(input);
  const combinationsCount = 2 ** capacities.length;
  const counts = new Map();
  for (let combination = 0; combination < combinationsCount; combination++) {
    const [capacity, count] = findCapacityCount(capacities, combination);
    if (capacity === target) {
      counts.set(count, counts.has(count) ? counts.get(count) + 1 : 1);
    }
  }
  return counts.get(Math.min(...counts.keys()));
}

function parseCapacities(text) {
  return text.split("\n").map(Number);
}

function findCapacityCount(capacities, combination) {
  let [capacity, count] = [0, 0];
  for (let bit = 0; bit < capacities.length; bit++) {
    if (combination & (1 << bit)) {
      (capacity += capacities[bit]), count++;
    }
  }
  return [capacity, count];
}
