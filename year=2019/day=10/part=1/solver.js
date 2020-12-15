export function solve(input) {
  const asteroids = parseAsteroids(input);
  const monitoringStation = findMonitoringStation(asteroids);
  return monitoringStation.detections.size;
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
  let best = { location: undefined, detections: new Set() };
  for (const location of asteroids) {
    const [x1, y1] = location;
    const detections = new Set();
    for (const asteroid of asteroids) {
      if (asteroid === location) {
        continue;
      }
      const [x2, y2] = asteroid;
      const [x, y] = [x2 - x1, y2 - y1];
      const angle = Math.atan2(y, x);
      detections.add(angle);
    }
    if (detections.size > best.detections.size) {
      best = { location, detections };
    }
  }
  return best;
}
