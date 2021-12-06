import Board from "./Board.js";

export function parseInput(text) {
  const [numbersToDrawText, ...boardTexts] = text.split("\n\n");
  const numbersToDraw = numbersToDrawText.split(",").map(Number);
  const boards = new Set(
    boardTexts.map(
      (boardText) =>
        new Board(
          boardText
            .split("\n")
            .map((line) => line.trim().split(/\s+/).map(Number))
        )
    )
  );
  return { numbersToDraw, boards };
}
