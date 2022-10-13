export default function solve(input: string, { endAt = 2503 } = {}) {
  const descriptions = parseReindeerDescriptions(input);
  const distanceGenerators = Array.from(descriptions, createDistanceGenerator);
  const points = Array.from(distanceGenerators, () => 0);
  for (let t = 0; t < endAt; t++) {
    const distances = distanceGenerators.map(
      (distanceGenerator) => distanceGenerator.next().value,
    );
    const maxDistance = Math.max(...distances);
    for (let i = 0; i < points.length; i++) {
      if (distances[i] === maxDistance) {
        points[i]++;
      }
    }
  }
  return Math.max(...points);
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

function* createDistanceGenerator(
  { velocity, flying, resting }: {
    velocity: number;
    flying: number;
    resting: number;
  },
): Generator<number, never> {
  let state = "flying";
  let distance = 0;
  let time = 0;
  while (true) {
    switch (state) {
      case "flying":
        yield (distance += velocity);
        if (++time === flying) {
          state = "resting";
          time = 0;
        }
        break;
      case "resting":
        yield distance;
        if (++time === resting) {
          state = "flying";
          time = 0;
        }
        break;
    }
  }
}
