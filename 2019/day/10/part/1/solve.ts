export default function solve(input: string) {
  const asteroids = parseAsteroids(input);
  const monitoringStation = findMonitoringStation(asteroids);
  return monitoringStation.detections.size;
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
    detections: new Set<number>(),
  };
  for (const location of asteroids) {
    const [x1, y1] = location;
    const detections = new Set<number>();
    for (const asteroid of asteroids) {
      if (asteroid === location) continue;
      const [x2, y2] = asteroid;
      const [x, y] = [x2 - x1, y2 - y1];
      const angle = Math.atan2(y, x);
      detections.add(angle);
    }
    if (detections.size <= best.detections.size) continue;
    best = { location, detections };
  }
  return best;
}
