import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
10000`;

  assertEquals(solve(input, { length: 20 }), "01100");
});
