export default function solve(input: string) {
  const platform = input.split("\n").map((line) => Array.from(line));
  let result = 0;
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
          result += platform.length - depths[x];
          depths[x]++;
      }
    }
  }
  return result;
}
