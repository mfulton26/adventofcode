function getAntennaLocationsByFrequency(grid: string[][]) {
  const map = new Map<string, { x: number; y: number }[]>();
  for (const [y, row] of grid.entries()) {
    for (const [x, char] of row.entries()) {
      if (char === ".") continue;
      map.get(char)?.push({ x, y }) ?? map.set(char, [{ x, y }]);
    }
  }
  return map;
}

export default function solve(input: string) {
  const grid = input.split("\n").reverse().map((line) => [...line]);
  const antennaLocationsByFrequency = getAntennaLocationsByFrequency(grid);
  const antinodeLocationHashes = new Set<string>();
  for (const antennaLocations of antennaLocationsByFrequency.values()) {
    for (let i = 0; i < antennaLocations.length; i++) {
      const a = antennaLocations[i];
      for (let j = 0; j < antennaLocations.length; j++) {
        if (j === i) continue;
        const b = antennaLocations[j];
        const m = { x: b.x - a.x, y: b.y - a.y };
        for (
          let k = 0, x = a.x - k * m.x, y = a.y - k * m.y;
          y in grid && x in grid[y];
          k++, x = a.x - k * m.x, y = a.y - k * m.y
        ) {
          antinodeLocationHashes.add(`${x},${y}`);
        }
        for (
          let k = 0, x = b.x + k * m.x, y = b.y + k * m.y;
          y in grid && x in grid[y];
          k++, x = b.x + k * m.x, y = b.y + k * m.y
        ) {
          antinodeLocationHashes.add(`${x},${y}`);
        }
      }
    }
  }
  return antinodeLocationHashes.size;
}
