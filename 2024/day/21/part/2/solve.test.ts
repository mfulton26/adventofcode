import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
029A
980A
179A
456A
379A`;

  assertEquals(solve(input, { depth: 2 }), 126384);
});
