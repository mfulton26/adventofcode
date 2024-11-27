import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("smaller example", () => {
  const input = `\
.....
..##.
..#..
.....
..##.
.....`;

  assertEquals(solve(input), 4);
});

Deno.test("larger example", () => {
  const input = `\
....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

  assertEquals(solve(input), 20);
});
