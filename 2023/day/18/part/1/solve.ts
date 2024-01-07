const directions = {
  "U": { x: 0, y: 1 },
  "D": { x: 0, y: -1 },
  "L": { x: -1, y: 0 },
  "R": { x: 1, y: 0 },
};

export default function solve(input: string) {
  const plan = input.split("\n").map((line) => {
    const [directionText, amountText] = line.split(" ");
    const direction = directions[directionText as "U" | "D" | "L" | "R"];
    const amount = +amountText;
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
