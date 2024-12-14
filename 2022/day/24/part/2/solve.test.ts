import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("complex example", () => {
  const input = `\
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

  assertEquals(solve(input), 54);
});
