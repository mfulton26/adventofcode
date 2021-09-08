export function solve(input) {
  const asteroids = parseAsteroids(input);
  const monitoringStation = findMonitoringStation(asteroids);
  const asteroidsVaporizer = createAsteroidsVaporizer(monitoringStation);
  let vaporized = 0;
  for (const vaporizedAsteroid of asteroidsVaporizer) {
    vaporized++;
    if (vaporized === 200) {
      const [x, y] = vaporizedAsteroid;
      return x * 100 + y;
    }
  }
}

function parseAsteroids(text) {
  return text
    .split("\n")
    .flatMap((line, y) =>
      Array.from(line).flatMap((position, x) =>
        position === "#" ? [[x, y]] : []
      )
    );
}

function findMonitoringStation(asteroids) {
  let best = { location: undefined, detections: new Map() };
  for (const location of asteroids) {
    const [x1, y1] = location;
    const detections = new Map();
    for (const asteroid of asteroids) {
      if (asteroid === location) {
        continue;
      }
      const [x2, y2] = asteroid;
      const [x, y] = [x2 - x1, y2 - y1];
      const radius = Math.sqrt(x * x + y * y);
      const angle = Math.atan2(y, x);
      if (detections.has(angle)) {
        detections.get(angle).set(radius, asteroid);
      } else {
        detections.set(angle, new Map([[radius, asteroid]]));
      }
    }
    if (detections.size > best.detections.size) {
      best = { location, detections };
    }
  }
  return best;
}

const twoPi = 2 * Math.PI;
const halfPi = Math.PI / 2;

function* createAsteroidsVaporizer(monitoringStation) {
  const asteroidsByAngle = Array.from(monitoringStation.detections)
    .map(([angle, asteroids]) => [(angle + halfPi + twoPi) % twoPi, asteroids])
    .sort(([a], [b]) => a - b)
    .map(([, targets]) => targets);
  for (const asteroids of asteroidsByAngle) {
    const radius = Math.min(...asteroids.keys());
    yield asteroids.get(radius);
  }
}
