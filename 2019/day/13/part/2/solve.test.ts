import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `1,2,3,6,5,4`;

  assertEquals(solve(input), 0);
});
