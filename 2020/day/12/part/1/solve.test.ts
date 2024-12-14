import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
F10
N3
F7
R90
F11`;

  assertEquals(solve(input), 25);
});
