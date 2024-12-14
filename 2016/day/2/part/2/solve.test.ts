import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
ULL
RRDDD
LURDL
UUUUD`;

  assertEquals(solve(input), "5DB3");
});
