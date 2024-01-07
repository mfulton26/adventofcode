import * as Games from "../../games.ts";

const limit = Object.freeze({ red: 12, green: 13, blue: 14 });

export default function solve(input: string) {
  return Games.parse(input)
    .filter((game) =>
      game.showings.every(
        ({ red = 0, green = 0, blue = 0 }) =>
          red <= limit.red && green <= limit.green && blue <= limit.blue,
      )
    )
    .reduce((sum, { id }) => sum + id, 0);
}
