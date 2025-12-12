export default function solve(input: string) {
  const sections = input.split("\n\n");
  const shapes = sections.slice(0, -1)
    .map((section) => (section.split("\n")).slice(1).join("\n"));
  const regions = sections.at(-1)!.split("\n").map((line) => {
    const [left, right] = line.split(": ");
    const [width, length] = left.split("x").map(Number);
    const shapeQuantities = right.split(" ").map(Number);
    return { width, length, shapeQuantities };
  });
  const shapeAreas = shapes.map((shape) => shape.split("#").length - 1);
  let fitCount = 0;
  for (const { width, length, shapeQuantities } of regions) {
    const regionArea = width * length;
    const sumOfShapeAreas = shapeQuantities.reduce(
      (sum, quantity, index) => sum + quantity * shapeAreas[index],
      0,
    );
    if (sumOfShapeAreas > regionArea) continue;
    fitCount++;
  }
  return fitCount;
}
