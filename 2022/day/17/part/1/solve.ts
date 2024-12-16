const shapes = [
  Object.assign([[0, 0], [1, 0], [2, 0], [3, 0]], { width: 4 }),
  Object.assign([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], { width: 3 }),
  Object.assign([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], { width: 3 }),
  Object.assign([[0, 0], [0, 1], [0, 2], [0, 3]], { width: 1 }),
  Object.assign([[0, 0], [1, 0], [0, 1], [1, 1]], { width: 2 }),
];

const pushCharToDirection: Record<string, number> = { "<": -1, ">": 1 };

export default function solve(input: string) {
  const chamber: boolean[][] = [];
  for (let i = 0, j = 0; i < 2022; i++) {
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
  }
  return chamber.length;
}
