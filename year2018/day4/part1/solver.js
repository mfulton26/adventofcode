export function solve(input) {
  const sleepHistogramsByGuardId = parseSleepHistogramsByGuardId(input);
  const guard = findGuardWithMostMinutesAsleep(sleepHistogramsByGuardId);
  const sleepHistogram = sleepHistogramsByGuardId.get(guard.id);
  const minuteMostAsleep = findMinuteMostAsleep(sleepHistogram);
  return guard.id * minuteMostAsleep;
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

function findGuardWithMostMinutesAsleep(sleepHistogramsByGuardId) {
  return Array.from(sleepHistogramsByGuardId, ([id, sleepHistogram]) => ({
    id,
    minutesAsleep: sleepHistogram.reduce((sum, value) => sum + value),
  })).reduce((max, entry) =>
    entry.minutesAsleep > max.minutesAsleep ? entry : max
  );
}

function findMinuteMostAsleep(sleepHistogram) {
  return sleepHistogram.indexOf(Math.max(...sleepHistogram));
}
