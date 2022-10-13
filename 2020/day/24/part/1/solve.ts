type Tile = [x: number, y: number];

export default function solve(input: string) {
  const tileIdentifiers = parseTileIdentifiers(input);
  const flippedTiles = findFlippedTiles(tileIdentifiers);
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
