export function solve(input, { endAt = 2503 } = {}) {
  const descriptions = parseReindeerDescriptions(input);
  const distances = descriptions.map(
    ({ velocity, flying, resting }) =>
      velocity * flying * Math.trunc(endAt / (flying + resting)) +
      velocity * Math.min(flying, endAt % (flying + resting))
  );
  return Math.max(...distances);
}

function parseReindeerDescriptions(text) {
  return text
    .split("\n")
    .map((line) => line.match(parseReindeerDescriptions.regExp))
    .map(({ groups: { reindeer, velocity, flying, resting } }) => ({
      reindeer,
      velocity: Number(velocity),
      flying: Number(flying),
      resting: Number(resting),
    }));
}
parseReindeerDescriptions.regExp =
  /^(?<reindeer>.*) can fly (?<velocity>\d+) km\/s for (?<flying>\d+) seconds, but then must rest for (?<resting>\d+) seconds./;
