export function solve(input) {
  const [, secondLine] = input.split("\n");
  const busIds = secondLine.split(",").map(Number);
  let time = 0n;
  let multiplier = 1n;
  for (let offset = 0n; offset < busIds.length; offset++) {
    if (isNaN(busIds[offset])) {
      continue;
    }
    const busId = BigInt(busIds[offset]);
    while ((time + offset) % busId !== 0n) {
      time += multiplier;
    }
    multiplier *= busId;
  }
  return time;
}
