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
    .map(({ groups }) => {
      for (const name in groups) {
        groups[name] = parseReindeerDescriptions.groupTypes[name](groups[name]);
      }
      return groups;
    });
}
parseReindeerDescriptions.regExp = /^(?<reindeer>.*) can fly (?<velocity>\d+) km\/s for (?<flying>\d+) seconds, but then must rest for (?<resting>\d+) seconds./;
parseReindeerDescriptions.groupTypes = {
  reindeer: String,
  velocity: Number,
  flying: Number,
  resting: Number,
};
