type Location = readonly [x: number, y: number];

const origin = Object.freeze<Location>([0, 0]);

export default function solve(input: string) {
  let location: Location = origin;
  const visited = new Set<string>().add(`${origin}`);
  for (const direction of input) {
    location = move[direction](location);
    visited.add(`${location}`);
  }
  return visited.size;
}

const move: Record<string, ([x, y]: Location) => Location> = {
  ["^"]: ([x, y]) => [x, y + 1],
  ["v"]: ([x, y]) => [x, y - 1],
  [">"]: ([x, y]) => [x + 1, y],
  ["<"]: ([x, y]) => [x - 1, y],
};
