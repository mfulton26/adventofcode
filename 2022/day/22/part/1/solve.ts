function parseInput(text: string) {
  const [boardText, pathDescription] = text.split("\n\n");
  const board = boardText.split("\n")
    .map((line) => Array.from(line, (char) => char.trim()));
  const path = pathDescription.matchAll(/\d+|L|R/g).map(([step]) => step);
  const x = board[0].findIndex(Boolean);
  return { board, path, start: [x, 0] };
}

export default function solve(input: string) {
  const { board, path, start } = parseInput(input);
  const { length: height, 0: { length: width } } = board;
  let [px, py] = start, dx = 1, dy = 0;
  for (const step of path) {
    switch (step) {
      case "L":
        [dx, dy] = [dy, -dx];
        break;
      case "R":
        [dx, dy] = [-dy, dx];
        break;
      default: {
        const moves = Number(step);
        for (let n = 0; n < moves; n++) {
          let nx = px, ny = py;
          do {
            nx = (nx + dx) % width, ny = (ny + dy) % height;
            if (dx && nx < 0) nx += width;
            if (dy && ny < 0) ny += height;
          } while (board[ny][nx] === undefined);
          if (board[ny][nx] === "#") break;
          [px, py] = [nx, ny];
        }
      }
    }
  }
  const row = py + 1;
  const column = px + 1;
  const facing = (dx === -1 || dy === -1 ? 2 : 0) + (dx === 0 ? 1 : 0);
  return 1_000 * row + 4 * column + facing;
}
