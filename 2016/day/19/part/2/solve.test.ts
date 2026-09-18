import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `5`;

  assertEquals(solve(input), 2);
});
