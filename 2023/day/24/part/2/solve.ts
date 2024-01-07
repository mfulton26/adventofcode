/** @see https://gist.githubusercontent.com/daninoz/8bf8981766e29476b317c9b75eebe8cb/raw/e77622a278d89bb34699897837eab80fb128072f/b.js */
export default function solve(input: string) {
  const hailstones = input.split("\n").map((line) => {
    const [p, v] = line.split(" @ ").map((text) => {
      const [x, y, z] = text.split(", ").map(Number);
      return { x, y, z };
    });
    return { p, v };
  });
  const v = Object.fromEntries(
    ["x" as const, "y" as const, "z" as const]
      .map((coordinate) => {
        const positionsByVelocity = hailstones.reduce(
          (map, { p: { [coordinate]: p }, v: { [coordinate]: v } }) =>
            map.set(v, [...(map.get(v) ?? []), p]),
          new Map<number, number[]>(),
        );
        let possibles = Array.from({ length: 2001 }, (_, v) => v - 1000);
        for (const [velocity, positions] of positionsByVelocity) {
          if (positions.length < 2) continue;
          possibles = possibles.filter((possible) =>
            (positions[0] - positions[1]) % (possible - velocity) === 0
          );
        }
        const [velocity] = possibles;
        return [coordinate, velocity];
      }),
  ) as typeof hailstones[number]["v"];
  const results = new Map<number, number>();
  for (let i = 0; i < hailstones.length; i++) {
    const a = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
      const b = hailstones[j];
      const ma = (a.v.y - v.y) / (a.v.x - v.x);
      const mb = (b.v.y - v.y) / (b.v.x - v.x);
      const ca = a.p.y - (ma * a.p.x);
      const cb = b.p.y - (mb * b.p.x);
      const x = Math.trunc((cb - ca) / (ma - mb));
      const y = Math.trunc(ma * x + ca);
      const t = Math.round((x - a.p.x) / (a.v.x - v.x));
      const z = a.p.z + (a.v.z - v.z) * t;
      const result = x + y + z;
      results.set(result, (results.get(result) ?? 0) + 1);
    }
  }
  return Array.from(results).sort(([, a], [, b]) => b - a)[0][0];
}
