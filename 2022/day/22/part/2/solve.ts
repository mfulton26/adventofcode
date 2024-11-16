type Point = Readonly<{ x: number; y: number }>;

function parseInput(text: string) {
  const [boardText, pathDescription] = text.split("\n\n");
  const board = boardText.split("\n")
    .map((line) => Array.from(line, (char) => char === " " ? undefined : char));
  const path = pathDescription.matchAll(/\d+|L|R/g).map(([step]) => step);
  const x = board[0].findIndex(Boolean);
  return { board, path, start: <Point> { x, y: 0 } };
}

export default function solve(input: string, { size = 50 } = {}) {
  const { board, path, start } = parseInput(input);
  const { length: height, 0: { length: width } } = board;
  function* nextCandidates(p: Point, d: Point) {
    yield {
      p: { x: p.x + d.x, y: p.y + d.y },
      d: { ...d },
    };
    yield {
      p: { x: p.x + d.x * size + d.y, y: p.y + d.y * size + d.x },
      d: { x: -d.y, y: d.x },
    };
    yield {
      p: { x: p.x - d.x * size + d.y, y: p.y - d.y * size + d.x },
      d: { x: d.y, y: -d.x },
    };
    const offset = { x: size - d.x % size, y: size - d.y % size };
    yield {
      p: {
        x: p.x + d.x * (2 * offset.x - 1),
        y: p.y + d.y * (2 * offset.y - 1),
      },
      d: { x: -d.x, y: -d.y },
    };
    yield {
      p: {
        x: p.x - d.x * (2 * offset.x - 1),
        y: p.y - d.y * (2 * offset.y - 1),
      },
      d: { x: -d.x, y: -d.y },
    };
  }
  let p = start, d = { x: 1, y: 0 };
  for (const step of path) {
    switch (step) {
      case "L":
        d = { x: d.y, y: -d.x };
        break;
      case "R":
        d = { x: -d.y, y: d.x };
        break;
      default: {
        const moves = Number(step);
        for (let n = 0; n < moves; n++) {
          const next = nextCandidates(p, d).find(({ p: { x, y } }) =>
            board[y]?.[x]
          );
          if (!next) throw new Error("failed to calculate next position");
          if (board[next.p.y][next.p.x] === "#") break;
          p = next;
        }
      }
    }
  }
  const row = p.y + 1;
  const column = p.x + 1;
  const facing = (d.x === -1 || d.y === -1 ? 2 : 0) + Number(d.x === 0);
  return 1_000 * row + 4 * column + facing;
}
