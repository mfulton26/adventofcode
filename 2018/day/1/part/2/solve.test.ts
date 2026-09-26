import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "+1, -2, +3, +1", expected: 2 },
  { input: "+1, -1", expected: 0 },
  { input: "+3, +3, +4, -2, -4", expected: 10 },
  { input: "-6, +3, +8, +5, -6", expected: 5 },
  { input: "+7, +7, -2, -7, -4", expected: 14 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input.replaceAll(", ", "\n")), expected);
});
