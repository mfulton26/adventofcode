type Tile = [x: number, y: number];

export default function solve(input: string) {
  const tileIdentifiers = parseTileIdentifiers(input);
  let flippedTiles = findFlippedTiles(tileIdentifiers);
  for (let day = 1; day <= 100; day++) {
    flippedTiles = flipTiles(flippedTiles);
  }
  return flippedTiles.size;
}

function parseTileIdentifiers(text: string) {
  return text.split("\n").map((line) =>
    line.match(parseTileIdentifiers.regExp) as string[]
  );
}
parseTileIdentifiers.regExp = /e|se|sw|w|nw|ne/g;

function findFlippedTiles(tileIdentifiers: string[][]) {
  const result = new Map<string, Tile>();
  for (const tileIdentifier of tileIdentifiers) {
    let tile = <Tile> [0, 0];
    for (const step of tileIdentifier) {
      tile = findFlippedTiles.stepFunctionsByStep[step](tile);
    }
    const hash = JSON.stringify(tile);
    if (result.has(hash)) result.delete(hash);
    else result.set(hash, tile);
  }
  return result;
}
findFlippedTiles.stepFunctionsByStep = <Record<string, (tile: Tile) => Tile>> {
  e: ([x, y]) => [x + 1, y],
  se: ([x, y]) => [x + 0.5, y - 1],
  sw: ([x, y]) => [x - 0.5, y - 1],
  w: ([x, y]) => [x - 1, y],
  nw: ([x, y]) => [x - 0.5, y + 1],
  ne: ([x, y]) => [x + 0.5, y + 1],
};

function flipTiles(flippedTiles: Map<string, Tile>) {
  const tilesToConsider = new Map<string, Tile>();
  for (const tile of flippedTiles.values()) {
    for (const fn of flipTiles.stepFunctions) {
      const adjacentTile = fn(tile);
      const hash = JSON.stringify(adjacentTile);
      tilesToConsider.set(hash, adjacentTile);
    }
  }
  const result = new Map<string, Tile>();
  for (const tile of tilesToConsider.values()) {
    const flippedNeighborsCount = flipTiles.stepFunctions.reduce(
      (count, fn) =>
        flippedTiles.has(JSON.stringify(fn(tile))) ? count + 1 : count,
      0,
    );
    const hash = JSON.stringify(tile);
    if (flippedTiles.has(hash)) {
      if (!(flippedNeighborsCount === 0 || flippedNeighborsCount > 2)) {
        result.set(hash, tile);
      }
    } else {
      if (flippedNeighborsCount === 2) {
        result.set(hash, tile);
      }
    }
  }
  return result;
}
flipTiles.stepFunctions = Object.values(findFlippedTiles.stepFunctionsByStep);
