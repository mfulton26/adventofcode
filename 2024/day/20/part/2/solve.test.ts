import { findSavedTimeCountsByCheating, parseTrack } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

  const track = parseTrack(input);

  assertEquals(
    findSavedTimeCountsByCheating(track, { min: 50 }),
    new Map([
      [50, 32],
      [52, 31],
      [54, 29],
      [56, 39],
      [58, 25],
      [60, 23],
      [62, 20],
      [64, 19],
      [66, 12],
      [68, 14],
      [70, 12],
      [72, 22],
      [74, 4],
      [76, 3],
    ]),
  );
});
