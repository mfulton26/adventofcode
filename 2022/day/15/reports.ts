const regExp =
  /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/gm;

export function* parseReports(text: string) {
  for (const match of text.matchAll(regExp)) {
    const sensor = match.slice(1, 3).map(Number) as [number, number];
    const closestBeacon = match.slice(3, 5).map(Number) as [number, number];
    yield { sensor, closestBeacon };
  }
}
