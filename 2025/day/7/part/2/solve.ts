export default function solve(input: string) {
  const rows = input.split("\n").map((line) => Array.from(line));
  const beamColumnIndexes = new Map([[rows[0].indexOf("S"), 1]]);
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (const [beamColumnIndex, timelineCount] of beamColumnIndexes) {
      if (rows[rowIndex + 1]?.[beamColumnIndex] !== "^") continue;
      beamColumnIndexes.delete(beamColumnIndex);
      for (const direction of [-1, 1]) {
        const splitColumnIndex = beamColumnIndex + direction;
        const prevTimelineCount = beamColumnIndexes.get(splitColumnIndex);
        const nextTimelineCount = (prevTimelineCount ?? 0) + timelineCount;
        beamColumnIndexes.set(splitColumnIndex, nextTimelineCount);
      }
    }
  }
  return beamColumnIndexes.values()
    .reduce((sum, timelineCount) => sum + timelineCount, 0);
}
