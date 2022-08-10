export default class Board {
  #rows;
  #called = new Set();

  constructor(rows) {
    this.#rows = rows;
  }

  call(number) {
    if (!this.#rows.some((row) => row.includes(number))) return false;
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
