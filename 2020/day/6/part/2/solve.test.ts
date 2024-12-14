import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

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

  assertEquals(solve(input), 6);
});
