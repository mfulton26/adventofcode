import { Point, getBounds } from "./solve";

function stringify(points: Iterable<Point>) {
  const { width, height, left, top } = getBounds(points);
  const grid = Array.from(
    { length: height },
    () => Array.from({ length: width }, () => ".")
  );
  for (const { x, y } of points) grid[y - top][x - left] = "#";
  return grid.map((row) => row.join("")).join("\n");
}
