export type Grid = Set<string>[][];

export type ReadonlyGrid = readonly (readonly ReadonlySet<string>[])[];

export function stringify(
  grid: ReadonlyGrid,
  position?: { x: number; y: number },
) {
  if (position) {
    grid = structuredClone(grid);
    (grid as Grid)[position.y][position.x].add("E");
  }
  return grid.map((line) =>
    line.map((chars) =>
      chars.size > 1 ? chars.size : chars.values().next().value ?? "."
    ).join("")
  ).join("\n");
}
