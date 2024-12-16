const shapes = [
  Object.assign([[0, 0], [1, 0], [2, 0], [3, 0]], { width: 4 }),
  Object.assign([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], { width: 3 }),
  Object.assign([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], { width: 3 }),
  Object.assign([[0, 0], [0, 1], [0, 2], [0, 3]], { width: 1 }),
  Object.assign([[0, 0], [1, 0], [0, 1], [1, 1]], { width: 2 }),
];

const pushCharToDirection: Record<string, number> = { "<": -1, ">": 1 };

function stringify(chamber: boolean[][]) {
  let result = "";
  for (let i = chamber.length - 1; i >= 0; i--) {
    for (const item of chamber[i]) result += item ? "#" : ".";
    result += "\n";
  }
  return result;
}

export default function solve(input: string, { rocks = 1000000000000 } = {}) {
  const chamber: boolean[][] = [];
  let atFirstRepeat:
    | { rock: number; height: number; secondRepeatRegExp: RegExp }
    | undefined;
  let skippedHeight = 0;
  for (let rock = 1, i = 0, j = 0; rock <= rocks; rock++, i++) {
    const shape = shapes[i % shapes.length];
    for (let x = 2, y = chamber.length + 3; y >= 0; y--) {
      const dx = pushCharToDirection[input[j++ % input.length]];
      if (
        x + dx >= 0 && x + dx + shape.width <= 7 &&
        !shape.some(([rx, ry]) => chamber[y + ry]?.[x + rx + dx])
      ) x += dx;
      if (y === 0 || shape.some(([rx, ry]) => chamber[y + ry - 1]?.[x + rx])) {
        for (const [rx, ry] of shape) {
          chamber[y + ry] ??= Array.from({ length: 7 }, () => false);
          chamber[y + ry][x + rx] = true;
        }
        break;
      }
    }
    if (skippedHeight) continue;
    if (rock < 10000) continue;
    if (!atFirstRepeat) {
      const match = /((?:[.#]{7}\n){40,}?)(\1+)/m.exec(stringify(chamber));
      if (match === null) continue;
      const [, lines, repeats] = match;
      const times = repeats.length / lines.length;
      const secondRepeatRegExp = new RegExp(`(?:${lines}){${times + 2}}`, "m");
      atFirstRepeat = { rock, height: chamber.length, secondRepeatRegExp };
    } else if (atFirstRepeat.secondRepeatRegExp.test(stringify(chamber))) {
      const repeatedRocks = rock - atFirstRepeat.rock;
      const repeatedHeight = chamber.length - atFirstRepeat.height;
      const toRepeat = Math.floor((rocks - rock) / repeatedRocks);
      rock += toRepeat * repeatedRocks;
      skippedHeight = toRepeat * repeatedHeight;
    }
  }
  return chamber.length + skippedHeight;
}
