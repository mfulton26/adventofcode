import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

const input = `\
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

Deno.test("example 10x", () => {
  assertEquals(solve(input, { multiplier: 10 }), 1030);
});

Deno.test("example 100x", () => {
  assertEquals(solve(input, { multiplier: 100 }), 8410);
});
