const regExp = /^p=(?<px>\d+),(?<py>\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)$/gm;

export default function solve(
  input: string,
  { width = 101, height = 103 } = {},
) {
  const robots = input.matchAll(regExp).map((match) => match.map(Number))
    .map(([, px, py, vx, vy]) => ({ px, py, vx, vy })).toArray();
  moments: for (let t = 0;; t++) {
    const positionHashes = new Set();
    for (const { px, py, vx, vy } of robots) {
      const x = mod(px + vx * t, width), y = mod(py + vy * t, height);
      const positionHash = `${x},${y}`;
      if (positionHashes.has(positionHash)) continue moments;
      positionHashes.add(positionHash);
    }
    return t;
  }
}

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}
