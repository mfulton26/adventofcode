export function solve(input) {
  const sleepHistogramsByGuardId = parseSleepHistogramsByGuardId(input);
  const guard = findGuardWithMinuteMostFrequentlyAsleep(
    sleepHistogramsByGuardId
  );
  return guard.id * guard.minuteMostFrequentlyAsleep;
}

function parseSleepHistogramsByGuardId(input) {
  const result = new Map();
  let guardId, minuteFellAsleep, minuteWokeUp;
  for (const line of input.split("\n").sort()) {
    const [timeText, message] = line.split(/(?<=]) /);
    switch (message.replace(/Guard #\d+ /, "")) {
      case "begins shift":
        guardId = Number(message.match(/\d+/));
        if (!result.has(guardId)) {
          result.set(guardId, Array(60).fill(0));
        }
        break;
      case "falls asleep":
        minuteFellAsleep = Number(timeText.substring(15, 17));
        break;
      case "wakes up":
        minuteWokeUp = Number(timeText.substring(15, 17));
        const minutesAsleep = result.get(guardId);
        for (let i = minuteFellAsleep; i < minuteWokeUp; i++) {
          minutesAsleep[i]++;
        }
        break;
    }
  }
  return result;
}

function findGuardWithMinuteMostFrequentlyAsleep(sleepHistogramsByGuardId) {
  return Array.from(sleepHistogramsByGuardId, ([id, sleepHistogram]) => {
    const minutesOfMinuteMostFrequentlyAsleep = Math.max(...sleepHistogram);
    return {
      id,
      minutesOfMinuteMostFrequentlyAsleep,
      minuteMostFrequentlyAsleep: sleepHistogram.indexOf(
        minutesOfMinuteMostFrequentlyAsleep
      ),
    };
  }).reduce((max, entry) =>
    entry.minutesOfMinuteMostFrequentlyAsleep >
    max.minutesOfMinuteMostFrequentlyAsleep
      ? entry
      : max
  );
}
