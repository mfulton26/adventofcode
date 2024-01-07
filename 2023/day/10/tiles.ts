import directions, {
  Direction,
  east,
  north,
  south,
  west,
} from "./directions.ts";

export function parse(text: string) {
  const tiles = text.split("\n").map((line) =>
    Array.from(line, (char) => {
      switch (char) {
        case "|":
          return [north, south];
        case "-":
          return [east, west];
        case "L":
          return [north, east];
        case "J":
          return [north, west];
        case "7":
          return [south, west];
        case "F":
          return [south, east];
        case ".":
          return [] as Direction[];
      }
    })
  );
  const start = (() => {
    for (const [y, row] of tiles.entries()) {
      const x = row.indexOf(undefined);
      if (x === -1) continue;
      return { x, y };
    }
    throw new Error("starting position not found");
  })();
  tiles[start.y][start.x] = directions.filter((d) =>
    tiles.at(start.y - d.y)?.at(start.x + d.x)?.includes(d.opposite)
  );
  return { tiles: tiles as Direction[][][], start };
}
