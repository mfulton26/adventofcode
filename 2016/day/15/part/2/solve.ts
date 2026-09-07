function* parseDiscs(input: string) {
  const regExp =
    /^Disc #(?<number>\d+) has (?<positions>\d+) positions; at time=0, it is at position (?<start>\d+)\.$/gm;
  for (const [, ...strings] of input.matchAll(regExp)) {
    const [number, positions, start] = strings.map(Number);
    yield { number, positions, start };
  }
}

export default function solve(input: string) {
  let time = 0;
  let step = 1;
  const discs = parseDiscs(input).toArray();
  discs.push({ number: discs.length + 1, positions: 11, start: 0 });
  for (const { number, positions, start } of discs) {
    while ((start + time + number) % positions !== 0) time += step;
    step *= positions;
  }
  return time;
}
