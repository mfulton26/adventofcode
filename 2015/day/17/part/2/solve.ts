export default function solve(input: string, { target = 150 } = {}) {
  const capacities = parseCapacities(input);
  const combinationsCount = 2 ** capacities.length;
  const min = { numberOfContainers: Infinity, count: 0 };
  for (let combination = 0; combination < combinationsCount; combination++) {
    const [capacity, count] = findCapacityCount(capacities, combination);
    if (capacity === target) {
      if (count < min.numberOfContainers) {
        min.numberOfContainers = count;
        min.count = 1;
      } else if (count === min.numberOfContainers) {
        min.count++;
      }
    }
  }
  return min.count;
}

function parseCapacities(text: string) {
  return text.split("\n").map(Number);
}

function findCapacityCount(capacities: number[], combination: number) {
  let [capacity, count] = [0, 0];
  for (let bit = 0; bit < capacities.length; bit++) {
    if (combination & (1 << bit)) {
      (capacity += capacities[bit]), count++;
    }
  }
  return [capacity, count] as const;
}
