export default function solve(input: string) {
  const layout = input.split("\n");
  const { length: height, 0: { length: width } } = layout;
  const stack = [{ x: 0, y: 0, d: { x: 1, y: 0 } }];
  const energizedDirectionHashes = layout
    .map((row) => Array.from(row, () => new Set<string>()));
  while (stack.length) {
    const { x, y, d } = stack.pop()!;
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const hash = JSON.stringify(d);
    if (energizedDirectionHashes[y][x].has(hash)) continue;
    energizedDirectionHashes[y][x].add(hash);
    const energizedDirections = (() => {
      switch (layout[y][x]) {
        case "/":
          return [{ x: d.y, y: d.x }];
        case "\\":
          return [{ x: -d.y, y: -d.x }];
        case "|":
          if (d.x === 0) return [d];
          return [{ x: 0, y: 1 }, { x: 0, y: -1 }];
        case "-":
          if (d.y === 0) return [d];
          return [{ x: -1, y: 0 }, { x: 1, y: 0 }];
      }
    })();
    const directions = energizedDirections ?? [d];
    for (const d of directions) stack.push({ x: x + d.x, y: y - d.y, d });
  }
  return energizedDirectionHashes.flat().filter((set) => set.size).length;
}
