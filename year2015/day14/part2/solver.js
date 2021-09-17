export function solve(input, { endAt = 2503 } = {}) {
  const descriptions = parseReindeerDescriptions(input);
  const distanceGenerators = descriptions.map(DistanceGenerator);
  const points = descriptions.map(() => 0);
  for (let t = 0; t < endAt; t++) {
    const distances = distanceGenerators.map(
      (distanceGenerator) => distanceGenerator.next().value
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

function* DistanceGenerator({ velocity, flying, resting }) {
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
