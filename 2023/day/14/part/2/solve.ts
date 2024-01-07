function rotate<T>(data: T[][]) {
  const { length: height, 0: { length: width } } = data;
  return Array.from(
    { length: width },
    (_, x) => Array.from({ length: height }, (_, y) => data[height - y - 1][x]),
  );
}

export default function solve(input: string) {
  let platform = input.split("\n").map((line) => Array.from(line));
  const seen = new Map();
  for (let cycle = 0;; cycle++) {
    const hash = platform.flat().join("");
    if (
      seen.has(hash) &&
      (1000000000 - cycle) % (cycle - seen.get(hash)!) === 0
    ) break;
    seen.set(hash, cycle);
    for (let n = 1; n <= 4; n++) {
      const depths = platform[0].map(() => 0);
      for (const [y, row] of platform.entries()) {
        for (const [x, position] of row.entries()) {
          switch (position) {
            case "#":
              depths[x] = y + 1;
              continue;
            case "O":
              row[x] = ".";
              platform[depths[x]][x] = "O";
              depths[x]++;
          }
        }
      }
      platform = rotate(platform);
    }
  }
  let result = 0;
  for (const [y, row] of platform.entries()) {
    for (const position of row) {
      if (position !== "O") continue;
      result += platform.length - y;
    }
  }
  return result;
}
