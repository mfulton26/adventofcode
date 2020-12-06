const moves = {
  ["^"]: ([x, y]) => [x, y + 1],
  ["v"]: ([x, y]) => [x, y - 1],
  [">"]: ([x, y]) => [x + 1, y],
  ["<"]: ([x, y]) => [x - 1, y],
};

export function solve(input, origin = [0, 0]) {
  const locationHashSet = new Set([`${origin}`]);
  const santa = { location: origin };
  for (const char of input) {
    santa.location = moves[char](santa.location);
    locationHashSet.add(`${santa.location}`);
  }
  return locationHashSet.size;
}
