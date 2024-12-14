import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = "target area: x=20..30, y=-10..-5";

  assertEquals(solve(input), 45);
});
