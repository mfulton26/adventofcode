export function solve(input) {
  const { numbersToDraw, boards } = parseInput(input);
  for (const number of numbersToDraw)
    for (const board of boards)
      if (board.call(number))
        if (board.wins())
          if (boards.size > 1) boards.delete(board);
          else return board.score();
}

function parseInput(text) {
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

class Board {
  #rows;
  #numbers;
  #called = new Set();

  constructor(rows) {
    this.#rows = rows;
    this.#numbers = new Set(rows.flat());
  }

  call(number) {
    if (!this.#numbers.has(number)) return false;
    this.#called.add(number);
    return true;
  }

  wins() {
    for (const row of this.#rows)
      if (row.every((number) => this.#called.has(number))) return true;
    for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
      const column = this.#rows.map((row) => row[columnIndex]);
      if (column.every((number) => this.#called.has(number))) return true;
    }
  }

  score() {
    const unmarkedNumbers = this.#rows.flatMap((row) =>
      row.filter((number) => !this.#called.has(number))
    );
    const lastCalled = Array.from(this.#called)[this.#called.size - 1];
    return (
      unmarkedNumbers.reduce((sum, number) => sum + number, 0) * lastCalled
    );
  }
}
