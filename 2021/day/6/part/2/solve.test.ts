import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `3,4,3,1,2`;

  assertEquals(solve(input), 26984457539);
});
