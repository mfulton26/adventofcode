export function parsePositions(input: string) {
  return input.matchAll(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/g)
    .map(([, ...values]) => values.map(Number))
    .toArray();
}
