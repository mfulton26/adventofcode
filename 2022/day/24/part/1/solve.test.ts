import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#`;

  assertEquals(solve(input), 10);
});

Deno.test("complex example", () => {
  const input = `\
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

  assertEquals(solve(input), 18);
});
