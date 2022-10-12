type Coordinates = [x: number, y: number, z: number];

export default function solve(input: string) {
  let activeCells = parseActiveCells(input);
  for (let n = 0; n < 6; n++) {
    activeCells = cycleActiveCells(activeCells);
  }
  return activeCells.length;
}

function parseActiveCells(text: string) {
  return text.split("\n").flatMap((line, y) =>
    [...line].flatMap((state, x) => (
      state === "#" ? [<Coordinates> [x, y, 0]] : []
    ))
  );
}

function cycleActiveCells(activeCells: Coordinates[]) {
  const considerations = createConsiderations(activeCells);
  activeCells = [];
  for (const [cell, { active, activeNeighborCount }] of considerations) {
    if ((active && activeNeighborCount === 2) || activeNeighborCount === 3) {
      activeCells.push(cell);
    }
  }
  return activeCells;
}

const neighborDeltas = [-1, 0, 1]
  .flatMap((x, _, array) => array.flatMap((y) => array.map((z) => [x, y, z])))
  .filter((cell) => cell.some((coordinate) => coordinate !== 0));

function createConsiderations(activeCells: Coordinates[]) {
  const hashMap = new Map(
    activeCells.map((cell) => [`${cell}`, { cell, active: true }]),
  );
  for (const [x, y, z] of activeCells) {
    for (const [dx, dy, dz] of neighborDeltas) {
      const cell = <Coordinates> [x + dx, y + dy, z + dz];
      const hash = `${cell}`;
      if (hashMap.has(hash)) continue;
      hashMap.set(hash, { cell, active: false });
    }
  }
  const result = new Map();
  for (const { cell, active } of hashMap.values()) {
    const [x, y, z] = cell;
    let activeNeighborCount = 0;
    for (const [dx, dy, dz] of neighborDeltas) {
      const hash = `${[x + dx, y + dy, z + dz]}`;
      if (!hashMap.get(hash)?.active) continue;
      activeNeighborCount++;
    }
    result.set(cell, { active, activeNeighborCount });
  }
  return result;
}
