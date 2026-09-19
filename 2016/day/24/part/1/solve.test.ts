import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
###########
#0.1.....2#
#.#######.#
#4.......3#
###########`;

  assertEquals(solve(input), 14);
});
