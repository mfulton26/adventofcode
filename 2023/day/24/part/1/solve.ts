type Vector = { x: number; y: number };

/** @see https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines */
function intersect([p1, p2]: [Vector, Vector], [p3, p4]: [Vector, Vector]) {
  const denominator = (p4.y - p3.y) * (p2.x - p1.x) -
    (p4.x - p3.x) * (p2.y - p1.y);
  if (denominator === 0) return false;
  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
    denominator;
  return { x: p1.x + ua * (p2.x - p1.x), y: p1.y + ua * (p2.y - p1.y) };
}

export default function solve(
  input: string,
  { min = 200000000000000, max = 400000000000000 } = {},
) {
  const hailstones = input.split("\n").map((line) => {
    const [p, v] = line.split(" @ ").map((text) => {
      const [x, y, z] = text.split(", ").map(Number);
      return { x, y, z };
    });
    return { p, v };
  });
  let count = 0;
  for (let i = 0; i < hailstones.length; i++) {
    const a = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
      const b = hailstones[j];
      const intersection = intersect(
        [a.p, { x: a.p.x + a.v.x, y: a.p.y + a.v.y }],
        [b.p, { x: b.p.x + b.v.x, y: b.p.y + b.v.y }],
      );
      if (!intersection) continue;
      const { x, y } = intersection;
      if (x < min || x > max || y < min || y > max) continue;
      if (x - a.p.x > 0 !== a.v.x > 0 || y - a.p.y > 0 !== a.v.y > 0) continue;
      if (x - b.p.x > 0 !== b.v.x > 0 || y - a.p.y > 0 !== a.v.y > 0) continue;
      count++;
    }
  }
  return count;
}
