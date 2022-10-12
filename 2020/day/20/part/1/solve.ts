import { unreachable } from "std/testing/asserts.ts";

export default function solve(input: string) {
  const tiles = parseTiles(input);
  const assembledTiles = assembleTiles(tiles);
  return findProductOfCornerTileIds(assembledTiles);
}

type Tile = { id: number; image: boolean[][] };
type Coordinate = readonly [x: number, y: number];

function parseTiles(text: string) {
  return text.trim().split("\n\n").map((tileText) => {
    const [idLine, ...imageLines] = tileText.split("\n");
    const id = Number(idLine.slice(5, -1));
    const image = imageLines.map((imageLine) =>
      Array.from(imageLine, (char) => char === "#")
    );
    return <Tile> { id, image };
  });
}

function assembleTiles(tiles: Tile[]) {
  const length = Math.sqrt(tiles.length);
  const tileVariationsByTileId = findTileVariationsByTileId(tiles);
  const { leftToRight, topToBottom } = findTileVariationFits(
    tileVariationsByTileId,
  );
  const stack = [...tileVariationsByTileId].flatMap(
    ([tileId, tileVariations]) =>
      tileVariations.map((tileVariation) => {
        const tiles: Tile[][] = Array.from(
          { length },
          () => Array.from({ length }),
        );
        tiles[0][0] = tileVariation;
        const unusedIdSet = new Set(
          [...tileVariationsByTileId.keys()].filter(
            (id) => id !== tileId,
          ),
        );
        return { tiles, unusedIdSet, nextCoordinates: <Coordinate> [1, 0] };
      }),
  );
  while (stack.length) {
    const { tiles, unusedIdSet, nextCoordinates: coordinates } = stack.pop()!;
    if (unusedIdSet.size === 0) return tiles;
    const [x, y] = coordinates;
    let candidates = [...unusedIdSet].flatMap((unusedId) =>
      tileVariationsByTileId
        .get(unusedId)!
        .filter((candidate) => unusedIdSet.has(candidate.id))
    );
    if (x > 0) {
      candidates = candidates.filter((candidate) =>
        leftToRight.get(candidate) === tiles[y][x - 1]
      );
    }
    if (y > 0) {
      candidates = candidates.filter(
        (candidate) => topToBottom.get(candidate) === tiles[y - 1][x],
      );
    }
    const nextCoordinates = findNextCoordinates(coordinates, { length });
    stack.push(
      ...candidates.map((candidate) => ({
        tiles: tiles.map((row, thisY) =>
          row.map((cell, thisX) =>
            thisX === x && thisY === y ? candidate : cell
          )
        ),
        unusedIdSet: new Set(
          [...unusedIdSet].filter(
            (unusedId) => unusedId !== candidate.id,
          ),
        ),
        nextCoordinates,
      })),
    );
  }
  unreachable();
}

function findTileVariationsByTileId(tiles: Tile[]) {
  const result = new Map<number, Tile[]>();
  for (const tile of tiles) {
    const { id, image } = tile;
    result.set(id, findImageVariations(image).map((image) => ({ id, image })));
  }
  return result;
}

function findImageVariations(image: boolean[][]) {
  const result = [image, flipImage(image)];
  for (let i = 0; i < 6; i++) result.push(rotateImage(result[i]));
  return result;
}

function findNextCoordinates(
  [x, y]: Coordinate,
  { length }: { length: number },
) {
  x++;
  if (x === length) y++, x = 0;
  return <Coordinate> [x, y];
}

function flipImage(image: boolean[][]) {
  const lastIndex = image.length - 1;
  return image.map((_, y) => image[lastIndex - y]);
}

function rotateImage(image: boolean[][]) {
  const lastIndex = image.length - 1;
  return image.map((row, y) => row.map((_, x) => image[lastIndex - x][y]));
}

function findTileVariationFits(tileVariationsByTileId: Map<number, Tile[]>) {
  const leftToRight = new Map<Tile, Tile>();
  const topToBottom = new Map<Tile, Tile>();
  for (const [sourceTileId, sourceTileVariations] of tileVariationsByTileId) {
    for (const sourceTileVariation of sourceTileVariations) {
      const { image: sourceImage } = sourceTileVariation;
      for (
        const [
          targetTileId,
          targetTileVariations,
        ] of tileVariationsByTileId
      ) {
        if (sourceTileId === targetTileId) {
          continue;
        }
        for (const targetTileVariation of targetTileVariations) {
          const { image: targetImage } = targetTileVariation;
          if (
            sourceImage.every(
              (row, y) => row[0] === targetImage[y][row.length - 1],
            )
          ) {
            leftToRight.set(sourceTileVariation, targetTileVariation);
          }
          if (
            sourceImage[0].every(
              (cell, x) => cell === targetImage[targetImage.length - 1][x],
            )
          ) {
            topToBottom.set(sourceTileVariation, targetTileVariation);
          }
        }
      }
    }
  }
  return { leftToRight, topToBottom };
}

function findProductOfCornerTileIds(tiles: Tile[][]) {
  const lastIndex = tiles.length - 1;
  return (
    tiles[0][0].id *
    tiles[0][lastIndex].id *
    tiles[lastIndex][0].id *
    tiles[lastIndex][lastIndex].id
  );
}
