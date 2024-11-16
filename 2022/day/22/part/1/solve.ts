type Point = Readonly<{ x: number; y: number }>;

function parseInput(text: string) {
  const [boardText, pathDescription] = text.split("\n\n");
  const board = boardText.split("\n")
    .map((line) => Array.from(line, (char) => char === " " ? undefined : char));
  const path = pathDescription.matchAll(/\d+|L|R/g).map(([step]) => step);
  const x = board[0].findIndex(Boolean);
  return { board, path, start: <Point> { x, y: 0 } };
}

export default function solve(input: string) {
  const { board, path, start } = parseInput(input);
  const { length: height, 0: { length: width } } = board;
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
          let next = { ...p };
          do {
            next = { x: (next.x + d.x) % width, y: (next.y + d.y) % height };
            if (d.x && next.x < 0) next.x += width;
            if (d.y && next.y < 0) next.y += height;
          } while (board[next.y][next.x] === undefined);
          if (board[next.y][next.x] === "#") break;
          p = next;
        }
      }
    }
  }
  const row = p.y + 1;
  const column = p.x + 1;
  const facing = (d.x === -1 || d.y === -1 ? 2 : 0) + (d.x === 0 ? 1 : 0);
  return 1_000 * row + 4 * column + facing;
}
