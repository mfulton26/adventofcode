export default function solve(input: string, { endAt = 2503 } = {}) {
  const descriptions = parseReindeerDescriptions(input);
  const distances = Array.from(
    descriptions,
    ({ velocity, flying, resting }) =>
      velocity * flying * Math.trunc(endAt / (flying + resting)) +
      velocity * Math.min(flying, endAt % (flying + resting)),
  );
  return Math.max(...distances);
}

function* parseReindeerDescriptions(text: string) {
  for (const { groups } of text.matchAll(parseReindeerDescriptions.regExp)) {
    const { reindeer, velocity, flying, resting } = groups!;
    yield {
      reindeer,
      velocity: Number(velocity),
      flying: Number(flying),
      resting: Number(resting),
    };
  }
}
parseReindeerDescriptions.regExp =
  /^(?<reindeer>.*) can fly (?<velocity>\d+) km\/s for (?<flying>\d+) seconds, but then must rest for (?<resting>\d+) seconds\./gm;
