import * as Games from "../../games.ts";

export default function solve(input: string) {
  return Games.parse(input)
    .map(({ showings }) =>
      showings
        .reduce(
          ([red, green, blue], showing) => [
            Math.max(red, showing.red ?? 0),
            Math.max(green, showing.green ?? 0),
            Math.max(blue, showing.blue ?? 0),
          ],
          [0, 0, 0],
        )
        .reduce((product, number) => product * number, 1)
    )
    .reduce((sum, power) => sum + power, 0);
}
