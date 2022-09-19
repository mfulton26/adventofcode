import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
.#.#.#
...##.
#....#
..#...
#.#..#
####..`;

  assertEquals(solve(input, { steps: 5 }), 17);
});
