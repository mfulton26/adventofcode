import solve, { findSavedTimeCountsByCheating, parseTrack } from "./solve.ts";

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
    findSavedTimeCountsByCheating(track),
    new Map([
      [2, 14],
      [4, 14],
      [6, 2],
      [8, 4],
      [10, 2],
      [12, 3],
      [20, 1],
      [36, 1],
      [38, 1],
      [40, 1],
      [64, 1],
    ]),
  );
});
