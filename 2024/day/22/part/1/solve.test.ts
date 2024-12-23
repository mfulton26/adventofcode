import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
1
10
100
2024`;

  assertEquals(solve(input), 37327623);
});
