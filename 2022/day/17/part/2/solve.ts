interface Rock {
  coordinates: [x: number, y: number][];
  width: number;
  height: number;
}

const rockTemplates = [
  {
    coordinates: [[0, 0], [1, 0], [2, 0], [3, 0]], // -
    width: 4,
    height: 1,
  },
  {
    coordinates: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], // +
    width: 3,
    height: 3,
  },
  {
    coordinates: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
    width: 3,
    height: 3,
  },
  {
    coordinates: [[0, 0], [0, 1], [0, 2], [0, 3]],
    width: 1,
    height: 4,
  },
  {
    coordinates: [[0, 0], [1, 0], [0, 1], [1, 1]],
    width: 2,
    height: 2,
  },
];

function* cycle<T>(iterable: Iterable<T>): Generator<T, never, undefined> {
  while (true) yield* iterable;
}

function* parseJetDirections(text: string): Generator<-1 | 1, never> {
  for (const char of cycle(Array.from(text))) yield char === "<" ? -1 : 1;
  throw new Error("unreachable");
}

function* rocks(): Generator<Rock, never> {
  for (const template of cycle(rockTemplates)) yield structuredClone(template);
  throw new Error("unreachable");
}

const Chambers = {
  stringify(chamber: boolean[][]) {
    return chamber.toReversed()
      .map((line) => line.map((item) => item ? "#" : ".").join(""))
      .join("\n");
  },
};

export default function solve(input: string) {
  const jetDirectionIterator = parseJetDirections(input);
  const chamber: boolean[][] = [];
  const rockIterator = rocks();
  for (let n = 1; n <= 1000000000000; n++) {
    const { value: rock } = rockIterator.next();
    for (let x = 2, y = chamber.length + 3; y >= 0; y--) {
      const { value: jetDirection } = jetDirectionIterator.next();
      if (
        (
          jetDirection === -1 && x > 0 ||
          jetDirection === 1 && x + rock.width < 7
        ) &&
        !rock.coordinates.some(([rx, ry]) =>
          chamber[y + ry]?.[x + rx + jetDirection]
        )
      ) {
        x += jetDirection;
      }
      if (
        y === 0 ||
        rock.coordinates.some(([rx, ry]) => chamber[y + ry - 1]?.[x + rx])
      ) {
        rock.coordinates.forEach(([rx, ry]) => {
          chamber[y + ry] ??= Array.from({ length: 7 }, () => false);
          chamber[y + ry][x + rx] = true;
        });
        break;
      }
    }
    if (n < 10000 || n > 1000000000000 - 10000) continue;
    const match = /((?:[.#]{7}\n)+?)\1\1\1/m.exec(Chambers.stringify(chamber));
    if (match === null) continue;
    const [, lines] = match;
    const repeatedHeight = lines.length / 8;
    console.log({ repeatedHeight });
    const newChamberHeight = chamber.length + Math.floor(
          (1000000000000 - chamber.length) / repeatedHeight,
        ) * repeatedHeight;
    console.log({ newChamberHeight });
    for (let offset = 1; offset <= repeatedHeight; offset++) {
      chamber[newChamberHeight - offset] = chamber[chamber.length - offset];
    }
    n = newChamberHeight - 1;
    console.log("n", n);
  }
  // console.debug(Chambers.stringify(chamber));
  return chamber.length;
}
