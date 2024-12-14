import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
20
15
10
5
5`;

  assertEquals(solve(input, { target: 25 }), 4);
});
