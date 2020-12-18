export function solve(input) {
  let grid = parseGrid(input);
  for (let n = 0; n < 6; n++) {
    grid = cycle(grid);
  }
  return grid.size;
}

function parseGrid(text) {
  return new Set(
    text
      .split("\n")
      .flatMap((line, y) =>
        Array.from(line).flatMap((state, x) =>
          state === "#" ? [[x, y, 0, 0]] : []
        )
      )
  );
}

function cycle(grid) {
  const cycleMap = createCycleMap(grid);
  const result = new Set();
  for (const [coordinates, { active, activeNeighborCount }] of cycleMap) {
    if (shouldBeActive(active, activeNeighborCount)) {
      result.add(coordinates);
    }
  }
  return result;
}

const neighborDeltas = [-1, 0, 1]
  .flatMap((x, _, array) =>
    array.flatMap((y) => array.flatMap((z) => array.map((w) => [x, y, z, w])))
  )
  .filter((coordinates) => coordinates.some((coordinate) => coordinate !== 0));

function createCycleMap(grid) {
  const hashMap = new Map(
    Array.from(grid, (coordinates) => [
      JSON.stringify(coordinates),
      [coordinates, true],
    ])
  );
  for (const [x, y, z, w] of grid) {
    for (const [dx, dy, dz, dw] of neighborDeltas) {
      const coordinates = [x + dx, y + dy, z + dz, w + dw];
      const hash = JSON.stringify(coordinates);
      if (!hashMap.has(hash)) {
        hashMap.set(hash, [coordinates, false]);
      }
    }
  }
  const result = new Map();
  for (const [coordinates, active] of hashMap.values()) {
    const [x, y, z, w] = coordinates;
    let activeNeighborCount = 0;
    for (const [dx, dy, dz, dw] of neighborDeltas) {
      const hash = JSON.stringify([x + dx, y + dy, z + dz, w + dw]);
      const active = hashMap.get(hash)?.[1];
      if (active) {
        activeNeighborCount++;
      }
    }
    result.set(coordinates, { active, activeNeighborCount });
  }
  return result;
}

function shouldBeActive(active, activeNeighborCount) {
  return active
    ? activeNeighborCount === 2 || activeNeighborCount === 3
    : activeNeighborCount === 3;
}
