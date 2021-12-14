export function parseHeights(text) {
  return Object.defineProperties(
    text.split("\n").map((line) => Array.from(line, Number)),
    {
      neighbors: {
        value([x, y]) {
          return [
            [x + 1, y],
            [x, y - 1],
            [x - 1, y],
            [x, y + 1],
          ].filter(([x, y]) => this[y]?.[x] !== undefined);
        },
      },
      findBasinSize: {
        value([x, y]) {
          const seen = new Set();
          const queue = [[x, y]];
          while (queue.length) {
            const [x, y] = queue.shift();
            const hash = `${y},${x}`;
            if (seen.has(hash)) continue;
            seen.add(hash);
            queue.push(
              ...this.neighbors([x, y]).filter(([x, y]) => this[y][x] !== 9)
            );
          }
          return seen.size;
        },
      },
    }
  );
}
