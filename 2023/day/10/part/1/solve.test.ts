import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example 1", () => {
  const input = `\
.....
.S-7.
.|.|.
.L-J.
.....`;

  assertEquals(solve(input), 4);
});


Deno.test("example 2", () => {
  const input = `\
..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

  assertEquals(solve(input), 8);
});
