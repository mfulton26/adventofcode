const directions = [[1, 0], [0, 1], [-1, 0], [-0, -1]];

export default function solve(input: string) {
  const map = input.split("\n").map((line) => Array.from(line, Number));
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== 0) continue;
      let rating = 0;
      const stack = [[x, y]];
      while (stack.length) {
        const [x, y] = stack.pop()!;
        const level = map[y][x];
        if (level === 9) {
          rating++;
          continue;
        }
        for (const [dx, dy] of directions) {
          if (map[y + dy]?.[x + dx] === level + 1) stack.push([x + dx, y + dy]);
        }
      }
      sum += rating;
    }
  }
  return sum;
}
