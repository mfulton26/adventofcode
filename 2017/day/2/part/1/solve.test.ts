import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
5 1 9 5
7 5 3
2 4 6 8`;

  assertEquals(solve(input), 18);
});
