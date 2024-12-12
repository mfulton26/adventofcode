const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

export default function solve(input: string) {
  const map = input.split("\n").map((line) => [...line]);
  const handledHashes = new Set<string>();
  let totalPrice = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (handledHashes.has(`${x},${y}`)) continue;
      const plantType = map[y][x];
      const stack = [[x, y]];
      let area = 0;
      let perimeter = 0;
      while (stack.length) {
        const [x, y] = stack.pop()!;
        const hash = `${x},${y}`;
        if (handledHashes.has(hash)) continue;
        area++;
        for (const [dx, dy] of directions) {
          if (map[y + dy]?.[x + dx] === plantType) stack.push([x + dx, y + dy]);
          else perimeter++;
        }
        handledHashes.add(hash);
      }
      totalPrice += area * perimeter;
    }
  }
  return totalPrice;
}
