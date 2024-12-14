import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
5764801
17807724`;

  assertEquals(solve(input), 14897079);
});
