import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

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
