export default function solve(input: string) {
  const asteroids = parseAsteroids(input);
  const monitoringStation = findMonitoringStation(asteroids);
  const asteroidsVaporizer = createAsteroidsVaporizer(monitoringStation);
  let vaporized = 0;
  for (const vaporizedAsteroid of asteroidsVaporizer) {
    vaporized++;
    if (vaporized !== 200) continue;
    const [x, y] = vaporizedAsteroid;
    return x * 100 + y;
  }
}

function parseAsteroids(text: string): [number, number][] {
  return text.split("\n").flatMap((line, y) =>
    Array.from(line).flatMap((position, x) =>
      position === "#" ? [[x, y] as [number, number]] : []
    )
  );
}

function findMonitoringStation(asteroids: [number, number][]) {
  let best = {
    location: <[number, number] | undefined> undefined,
    detections: new Map<number, Map<number, [number, number]>>(),
  };
  for (const location of asteroids) {
    const [x1, y1] = location;
    const detections = new Map<number, Map<number, [number, number]>>();
    for (const asteroid of asteroids) {
      if (asteroid === location) continue;
      const [x2, y2] = asteroid;
      const [x, y] = [x2 - x1, y2 - y1];
      const radius = Math.sqrt(x * x + y * y);
      const angle = Math.atan2(y, x);
      if (!detections.has(angle)) detections.set(angle, new Map());
      detections.get(angle)!.set(radius, asteroid);
    }
    if (detections.size <= best.detections.size) continue;
    best = { location, detections };
  }
  return best;
}

const twoPi = 2 * Math.PI;
const halfPi = Math.PI / 2;

function* createAsteroidsVaporizer(
  monitoringStation: ReturnType<typeof findMonitoringStation>,
) {
  const asteroidsByAngle = [...monitoringStation.detections]
    .map(([angle, asteroids]) =>
      [(angle + halfPi + twoPi) % twoPi, asteroids] as const
    )
    .sort(([a], [b]) => a - b)
    .map(([, targets]) => targets);
  for (const asteroids of asteroidsByAngle) {
    const radius = Math.min(...asteroids.keys());
    yield asteroids.get(radius)!;
  }
}
