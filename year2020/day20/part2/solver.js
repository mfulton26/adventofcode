export function solve(input) {
  const tiles = parseTiles(input);
  const assembledTiles = assembleTiles(tiles);
  const image = combineTiles(assembledTiles);
  return findHabitatRoughness(image);
}

function parseTiles(text) {
  return text.split("\n\n").map((tileText) => {
    const [idLine, ...imageLines] = tileText.split("\n");
    const id = Number(idLine.slice(5, -1));
    const image = imageLines.map((imageLine) =>
      Array.from(imageLine, (char) => char === "#")
    );
    return { id, image };
  });
}

function assembleTiles(tiles) {
  const length = Math.sqrt(tiles.length);
  const tileVariationsByTileId = findTileVariationsByTileId(tiles);
  const { leftToRight, topToBottom } = findTileVariationFits(
    tileVariationsByTileId
  );
  const stack = Array.from(tileVariationsByTileId).flatMap(
    ([tileId, tileVariations]) =>
      tileVariations.map((tileVariation) => {
        const tiles = Array.from({ length }, () => Array.from({ length }));
        tiles[0][0] = tileVariation;
        const unusedIdSet = new Set(
          Array.from(tileVariationsByTileId.keys()).filter(
            (id) => id !== tileId
          )
        );
        return { tiles, unusedIdSet, nextCoordinates: [1, 0] };
      })
  );
  while (stack.length) {
    const { tiles, unusedIdSet, nextCoordinates: coordinates } = stack.pop();
    if (unusedIdSet.size === 0) {
      return tiles;
    }
    let [x, y] = coordinates;
    let candidates = Array.from(unusedIdSet).flatMap((unusedId) =>
      tileVariationsByTileId
        .get(unusedId)
        .filter((candidate) => unusedIdSet.has(candidate.id))
    );
    if (x > 0) {
      candidates = candidates.filter(
        (candidate) => leftToRight.get(candidate) === tiles[y][x - 1]
      );
    }
    if (y > 0) {
      candidates = candidates.filter(
        (candidate) => topToBottom.get(candidate) === tiles[y - 1][x]
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
          Array.from(unusedIdSet).filter(
            (unusedId) => unusedId !== candidate.id
          )
        ),
        nextCoordinates,
      }))
    );
  }
}

function findTileVariationsByTileId(tiles) {
  const result = new Map();
  for (const tile of tiles) {
    const { id, image } = tile;
    result.set(
      id,
      findImageVariations(image).map((image) => ({ id, image }))
    );
  }
  return result;
}

function findImageVariations(image) {
  const result = [image, flipImage(image)];
  for (let i = 0; i < 6; i++) {
    result.push(rotateImage(result[i]));
  }
  return result;
}

function findNextCoordinates([x, y], { length }) {
  x++;
  if (x === length) {
    y++;
    x = 0;
  }
  return [x, y];
}

function flipImage(image) {
  const lastIndex = image.length - 1;
  return image.map((_, y) => image[lastIndex - y]);
}

function rotateImage(image) {
  const lastIndex = image.length - 1;
  return image.map((row, y) => row.map((_, x) => image[lastIndex - x][y]));
}

function findTileVariationFits(tileVariationsByTileId) {
  const leftToRight = new Map();
  const topToBottom = new Map();
  for (const [sourceTileId, sourceTileVariations] of tileVariationsByTileId) {
    for (const sourceTileVariation of sourceTileVariations) {
      const { image: sourceImage } = sourceTileVariation;
      for (const [
        targetTileId,
        targetTileVariations,
      ] of tileVariationsByTileId) {
        if (sourceTileId === targetTileId) {
          continue;
        }
        for (const targetTileVariation of targetTileVariations) {
          const { image: targetImage } = targetTileVariation;
          if (
            sourceImage.every(
              (row, y) => row[0] === targetImage[y][row.length - 1]
            )
          ) {
            leftToRight.set(sourceTileVariation, targetTileVariation);
          }
          if (
            sourceImage[0].every(
              (cell, x) => cell === targetImage[targetImage.length - 1][x]
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

function combineTiles(tiles) {
  return tiles.flatMap((row) => {
    const [leftImage, ...restImages] = row.map(({ image }) =>
      image.slice(1, -1).map((line) => line.slice(1, -1))
    );
    return leftImage.map((row, y) => [
      ...row,
      ...restImages.flatMap((image) => image[y]),
    ]);
  });
}

function findHabitatRoughness(image) {
  const hashCount = countRaised(image);
  const seaMonsterCount = countSeaMonsters(image);
  const hashPerSeaMonster = countSeaMonsters.testCoordinates.length;
  return hashCount - seaMonsterCount * hashPerSeaMonster;
}

function countRaised(image) {
  return Array.from(image).reduce(
    (count, row) =>
      count + row.reduce((count, cell) => (cell ? count + 1 : count), 0),
    0
  );
}

function countSeaMonsters(image) {
  for (const imageVariation of findImageVariations(image)) {
    const width = 20;
    const height = 3;
    let count = 0;
    for (let y = 0; y < imageVariation.length - height; y++) {
      for (let x = 0; x < imageVariation.length - width; x++) {
        if (
          countSeaMonsters.testCoordinates.every(
            ([dx, dy]) => imageVariation[y + dy][x + dx]
          )
        ) {
          count++;
        }
      }
    }
    if (count) {
      return count;
    }
  }
}
countSeaMonsters.testCoordinates = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   ",
].flatMap((line, y) =>
  Array.from(line).flatMap((char, x) => (char === "#" ? [[x, y]] : []))
);
