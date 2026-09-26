import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "+1, -2, +3, +1", expected: 3 },
  { input: "+1, +1, +1", expected: 3 },
  { input: "+1, +1, -2", expected: 0 },
  { input: "-1, -2, -3", expected: -6 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input.replaceAll(", ", "\n")), expected);
});
