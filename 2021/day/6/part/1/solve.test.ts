import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `3,4,3,1,2`;

  assertEquals(solve(input), 5934);
});
