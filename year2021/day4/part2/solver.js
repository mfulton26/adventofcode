import { parseInput } from "../inputParser.js";

export function solve(input) {
  const { numbersToDraw, boards } = parseInput(input);
  for (const number of numbersToDraw)
    for (const board of boards)
      if (board.call(number))
        if (board.wins())
          if (boards.size > 1) boards.delete(board);
          else return board.score();
}
