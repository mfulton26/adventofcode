type Location = readonly [x: number, y: number];

const origin = Object.freeze<Location>([0, 0]);

export default function solve(input: string) {
  const locations: [Location, Location] = [origin, origin];
  const visited = new Set<string>().add(`${origin}`);
  for (let i = 0; i < input.length; i++) {
    const direction = input[i];
    const santaIndex = i % 2;
    locations[santaIndex] = move[direction](locations[santaIndex]);
    visited.add(`${locations[santaIndex]}`);
  }
  return visited.size;
}

const move: Record<string, ([x, y]: Location) => Location> = {
  ["^"]: ([x, y]) => [x, y + 1],
  ["v"]: ([x, y]) => [x, y - 1],
  [">"]: ([x, y]) => [x + 1, y],
  ["<"]: ([x, y]) => [x - 1, y],
};
