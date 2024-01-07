function parseRaceDetails(text: string) {
  const [[, ...times], [, ...distances]] = text.split("\n")
    .map((line) => line.split(/\s+/).map(Number));
  return times.map((time, i) => ({ time, distance: distances[i] }));
}

export default function solve(input: string) {
  let product = 1;
  for (const { time, distance } of parseRaceDetails(input)) {
    let wins = 0;
    for (let speed = 1; speed < time - 1; speed++) {
      if ((time - speed) * speed <= distance) continue;
      wins++;
    }
    product *= wins;
  }
  return product;
}
