const moves = {
  ["^"]: ([x, y]) => [x, y + 1],
  ["v"]: ([x, y]) => [x, y - 1],
  [">"]: ([x, y]) => [x + 1, y],
  ["<"]: ([x, y]) => [x - 1, y],
};

export function solve(input, origin = [0, 0]) {
  const locationHashSet = new Set([`${origin}`]);
  const santas = Array.from({ length: 2 }, () => ({ location: origin }));
  let santaIndex = 0;
  for (const char of input) {
    const santa = santas[santaIndex++ % santas.length];
    santa.location = moves[char](santa.location);
    locationHashSet.add(`${santa.location}`);
  }
  return locationHashSet.size;
}
