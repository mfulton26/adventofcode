const neighborDeltas = [-1, 0, 1]
  .flatMap((x, _, array) => array.flatMap((y) => array.map((z) => [x, y, z])))
  .filter((coordinates) => coordinates.some((coordinate) => coordinate !== 0));

export function solve(input) {
  let activeCoordinatesSet = new Set(
    input
      .split("\n")
      .flatMap((line, y) =>
        Array.from(line).flatMap((state, x) =>
          state === "#" ? [[x, y, 0]] : []
        )
      )
  );
  for (let cycle = 0; cycle < 6; cycle++) {
    const coordinatesHashMap = new Map(
      Array.from(activeCoordinatesSet, (coordinates) => [
        JSON.stringify(coordinates),
        [coordinates, true],
      ])
    );
    for (const [x, y, z] of activeCoordinatesSet) {
      for (const [dx, dy, dz] of neighborDeltas) {
        const coordinates = [x + dx, y + dy, z + dz];
        const hash = JSON.stringify(coordinates);
        if (!coordinatesHashMap.has(hash)) {
          coordinatesHashMap.set(hash, [coordinates, false]);
        }
      }
    }
    activeCoordinatesSet = new Set(
      Array.from(coordinatesHashMap.values()).flatMap(([[x, y, z], active]) => {
        const activeNeighborCount = neighborDeltas.reduce(
          (count, [dx, dy, dz]) =>
            coordinatesHashMap.get(
              JSON.stringify([x + dx, y + dy, z + dz])
            )?.[1]
              ? count + 1
              : count,
          0
        );
        active = active
          ? activeNeighborCount === 2 || activeNeighborCount === 3
          : activeNeighborCount === 3;
        return active ? [[x, y, z]] : [];
      })
    );
  }
  return activeCoordinatesSet.size;
}
