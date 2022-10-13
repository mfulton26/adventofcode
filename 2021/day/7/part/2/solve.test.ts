import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `16,1,2,0,4,2,7,1,2,14`;

  assertEquals(solve(input), 168);
});
