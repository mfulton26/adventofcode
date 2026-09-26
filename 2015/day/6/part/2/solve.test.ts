import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "turn on 0,0 through 0,0", expected: 1 },
  { input: "toggle 0,0 through 999,999", expected: 2000000 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
