import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
.#.#.#
...##.
#....#
..#...
#.#..#
####..`;

  assertEquals(solve(input, { steps: 4 }), 4);
});
