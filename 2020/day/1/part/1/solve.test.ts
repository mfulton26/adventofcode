import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
1721
979
366
299
675
1456`;

  assertEquals(solve(input), 514579);
});
