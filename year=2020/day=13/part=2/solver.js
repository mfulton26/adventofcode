export function solve(input) {
  const [, secondLine] = input.split("\n");
  const busIds = secondLine.split(",").map(Number);
  let [time] = busIds;
  let multiplier = time;
  for (let offset = 1; offset < busIds.length; offset++) {
    const busId = busIds[offset];
    if (isNaN(busId)) {
      continue;
    }
    while ((time + offset) % busId !== 0) {
      time += multiplier;
    }
    multiplier *= busId;
  }
  return time;
}
