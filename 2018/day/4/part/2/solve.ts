export default function solve(input: string) {
  const sleepHistogramsByGuardId = parseSleepHistogramsByGuardId(input);
  const guard = findGuardWithMinuteMostFrequentlyAsleep(
    sleepHistogramsByGuardId,
  );
  return guard.id * guard.minuteMostFrequentlyAsleep;
}

function parseSleepHistogramsByGuardId(text: string) {
  const result = new Map<number, number[]>();
  let guardId: number, minuteFellAsleep: number, minuteWokeUp: number;
  for (const line of text.split("\n").sort()) {
    const [timeText, message] = line.split(/(?<=]) /);
    switch (message.replace(/Guard #\d+ /, "")) {
      case "begins shift":
        guardId = Number(message.match(/\d+/));
        if (result.has(guardId)) break;
        result.set(guardId, Array(60).fill(0));
        break;
      case "falls asleep":
        minuteFellAsleep = Number(timeText.substring(15, 17));
        break;
      case "wakes up":
        minuteWokeUp = Number(timeText.substring(15, 17));
        for (let i = minuteFellAsleep!; i < minuteWokeUp; i++) {
          result.get(guardId!)![i]++;
        }
        break;
    }
  }
  return result;
}

function findGuardWithMinuteMostFrequentlyAsleep(
  sleepHistogramsByGuardId: Map<number, number[]>,
) {
  return Array.from(sleepHistogramsByGuardId, ([id, sleepHistogram]) => {
    const minutesOfMinuteMostFrequentlyAsleep = Math.max(...sleepHistogram);
    return {
      id,
      minutesOfMinuteMostFrequentlyAsleep,
      minuteMostFrequentlyAsleep: sleepHistogram.indexOf(
        minutesOfMinuteMostFrequentlyAsleep,
      ),
    };
  }).reduce((max, entry) =>
    entry.minutesOfMinuteMostFrequentlyAsleep >
        max.minutesOfMinuteMostFrequentlyAsleep
      ? entry
      : max
  );
}
