export default function solve(input: string) {
  const changes = input.split("\n").map(Number);
  let frequency = 0;
  const seen = new Set([frequency]);
  while (true) {
    for (const change of changes) {
      frequency += change;
      if (seen.has(frequency)) {
        return frequency;
      } else {
        seen.add(frequency);
      }
    }
  }
}
