const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

export function parseTrack(text: string) {
  return text.split("\n").map((line) => [...line]);
}

function buildTimeTrack(track: string[][]) {
  const result = track.map((row) => row.map(() => Infinity));
  const yf = track.findIndex((line) => line.includes("E")),
    xf = track[yf].indexOf("E");
  const stack = [[xf, yf, 0]];
  const seen = new Set<`${number},${number}`>();
  while (stack.length) {
    const [x, y, t] = stack.pop()!;
    const hash = `${x},${y}` as const;
    if (seen.has(hash)) continue;
    seen.add(hash);
    if (track[y][x] === "#") continue;
    result[y][x] = t;
    for (const [dx, dy] of directions) stack.push([x + dx, y + dy, t + 1]);
  }
  return result;
}

function* manhattanDirections(d: number) {
  for (let offset = 0; offset < d; offset++) {
    const complement = d - offset;
    yield [offset, complement];
    yield [complement, -offset];
    yield [-offset, -complement];
    yield [-complement, offset];
  }
}

export function findSavedTimeCountsByCheating(
  track: string[][],
  { min = 1 } = {},
) {
  const result = new Map<number, number>();
  const timeTrack = buildTimeTrack(track);
  for (let cheatTime = 2; cheatTime <= 20; cheatTime++) {
    for (let y = 0; y < timeTrack.length; y++) {
      for (let x = 0; x < timeTrack[y].length; x++) {
        const t = timeTrack[y][x];
        if (t === Infinity) continue;
        for (const [dx, dy] of manhattanDirections(cheatTime)) {
          const rt = timeTrack[y + dy]?.[x + dx];
          if (!isFinite(rt)) continue;
          const saved = t - rt - cheatTime;
          if (saved < min) continue;
          result.set(saved, (result.get(saved) ?? 0) + 1);
        }
      }
    }
  }
  return result;
}

export default function solve(input: string) {
  const track = parseTrack(input);
  let sum = 0;
  const savedTimeCounts = findSavedTimeCountsByCheating(track);
  for (const [saved, count] of savedTimeCounts) if (saved >= 100) sum += count;
  return sum;
}
