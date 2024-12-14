import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("smaller example", () => {
  const input = `\
.....
..##.
..#..
.....
..##.
.....`;

  assertEquals(solve(input), 25);
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

  assertEquals(solve(input), 110);
});
