export default function solve(input: string) {
  const rows = input.split("\n").map((line) => Array.from(line));
  const timelineCounts = new Map([[rows[0].indexOf("S"), 1]]);
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (const [beamColumnIndex, timelineCount] of timelineCounts) {
      if (rows[rowIndex + 1]?.[beamColumnIndex] !== "^") continue;
      timelineCounts.delete(beamColumnIndex);
      for (const direction of [-1, 1]) {
        const splitColumnIndex = beamColumnIndex + direction;
        const prevTimelineCount = timelineCounts.get(splitColumnIndex);
        const nextTimelineCount = (prevTimelineCount ?? 0) + timelineCount;
        timelineCounts.set(splitColumnIndex, nextTimelineCount);
      }
    }
  }
  return timelineCounts.values().reduce((sum, count) => sum + count, 0);
}
