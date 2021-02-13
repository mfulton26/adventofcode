export function solve(input) {
  const tileIdentifiers = parseTileIdentifiers(input);
  const flippedTiles = findFlippedTiles(tileIdentifiers);
  return flippedTiles.size;
}

function parseTileIdentifiers(text) {
  return text
    .split("\n")
    .map((line) => line.match(parseTileIdentifiers.regExp));
}
parseTileIdentifiers.regExp = /e|se|sw|w|nw|ne/g;

function findFlippedTiles(tileIdentifiers) {
  const result = new Map();
  for (const tileIdentifier of tileIdentifiers) {
    let tile = [0, 0];
    for (const step of tileIdentifier) {
      tile = findFlippedTiles.stepFunctionsByStep[step](tile);
    }
    const hash = JSON.stringify(tile);
    if (result.has(hash)) {
      result.delete(hash);
    } else {
      result.set(hash, tile);
    }
  }
  return result;
}
findFlippedTiles.stepFunctionsByStep = {
  e: ([x, y]) => [x + 1, y],
  se: ([x, y]) => [x + 0.5, y - 1],
  sw: ([x, y]) => [x - 0.5, y - 1],
  w: ([x, y]) => [x - 1, y],
  nw: ([x, y]) => [x - 0.5, y + 1],
  ne: ([x, y]) => [x + 0.5, y + 1],
};
