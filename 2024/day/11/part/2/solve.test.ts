import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = "125 17";

  assertEquals(solve(input, { blinks: 25 }), 55312);
});
