export function parseGrid(text: string) {
  const map = new Map<string, "#" | "o">();
  let height = 0;
  for (const line of text.split("\n")) {
    const path = line.split(" -> ").map((word) => word.split(",").map(Number));
    for (let i = 0; i < path.length - 1; i++) {
      const [x0, y0] = path[i];
      const [xf, yf] = path[i + 1];
      const [xd, yd] = [Math.sign(xf - x0), Math.sign(yf - y0)];
      const [xs, ys] = [xf + xd, yf + yd];
      for (
        let [x, y] = [x0, y0];
        x !== xs || y !== ys;
        [x, y] = [x + xd, y + yd]
      ) {
        map.set(`${x},${y}`, "#");
      }
      for (const y of [y0, yf]) if (y > height) height = y;
    }
  }
  return { map, height };
}
