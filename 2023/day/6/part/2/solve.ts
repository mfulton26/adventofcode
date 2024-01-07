function parseRaceDetails(text: string) {
  const [time, distance] = text.split("\n")
    .map((line) => Number(line.split(/\s+/).slice(1).join("")));
  return { time, distance };
}

export default function solve(input: string) {
  const { time, distance } = parseRaceDetails(input);
  let wins = 0;
  for (let speed = 1; speed < time - 1; speed++) {
    if ((time - speed) * speed <= distance) continue;
    wins++;
  }
  return wins;
}
