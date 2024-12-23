import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
1
2
3
2024`;

  assertEquals(solve(input), 23);
});
