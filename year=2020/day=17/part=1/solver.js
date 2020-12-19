export function solve(input) {
  let activeCells = parseActiveCells(input);
  for (let n = 0; n < 6; n++) {
    activeCells = cycleActiveCells(activeCells);
  }
  return activeCells.length;
}

function parseActiveCells(text) {
  return text
    .split("\n")
    .flatMap((line, y) =>
      Array.from(line).flatMap((state, x) => (state === "#" ? [[x, y, 0]] : []))
    );
}

function cycleActiveCells(activeCells) {
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

function createConsiderations(activeCells) {
  const hashMap = new Map(activeCells.map((cell) => [`${cell}`, [cell, true]]));
  for (const [x, y, z] of activeCells) {
    for (const [dx, dy, dz] of neighborDeltas) {
      const cell = [x + dx, y + dy, z + dz];
      const hash = `${cell}`;
      if (!hashMap.has(hash)) {
        hashMap.set(hash, [cell, false]);
      }
    }
  }
  const result = new Map();
  for (const [cell, active] of hashMap.values()) {
    const [x, y, z] = cell;
    let activeNeighborCount = 0;
    for (const [dx, dy, dz] of neighborDeltas) {
      const hash = `${[x + dx, y + dy, z + dz]}`;
      const active = hashMap.get(hash)?.[1];
      if (active) {
        activeNeighborCount++;
      }
    }
    result.set(cell, { active, activeNeighborCount });
  }
  return result;
}
