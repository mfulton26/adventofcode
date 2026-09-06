import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
abc`;

  assertEquals(solve(input), 22728);
});
