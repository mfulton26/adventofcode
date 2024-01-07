const directions = {
  0: { x: 1, y: 0 },
  1: { x: 0, y: -1 },
  2: { x: -1, y: 0 },
  3: { x: 0, y: 1 },
};

export default function solve(input: string) {
  const plan = input.split("\n").map((line) => {
    const [, , text] = line.split(" ");
    const colorText = text.slice(2, -1);
    const amount = parseInt(colorText.slice(0, 5), 16);
    const direction = directions[+colorText.at(-1)! as 0 | 1 | 2 | 3];
    return { direction, amount };
  });
  const vertices = <{ x: number; y: number }[]> [];
  let x = 0, y = 0;
  for (const { direction: d, amount } of plan) {
    x += amount * d.x, y += amount * d.y;
    vertices.push({ x, y });
  }
  let area = 0;
  let perimeter = 0;
  for (let i = 0, j = 1; i < vertices.length; i++, j++, j %= vertices.length) {
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
    perimeter += Math.abs(vertices[i].x - vertices[j].x);
    perimeter += Math.abs(vertices[i].y - vertices[j].y);
  }
  return (Math.abs(area) + perimeter) / 2 + 1;
}
