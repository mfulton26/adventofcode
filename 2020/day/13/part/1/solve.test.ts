import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
939
7,13,x,x,59,x,31,19`;

  assertEquals(solve(input), 295);
});
