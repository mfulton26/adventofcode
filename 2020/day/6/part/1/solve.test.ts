import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
abc

a
b
c

ab
ac

a
a
a
a

b`;

  assertEquals(solve(input), 11);
});
