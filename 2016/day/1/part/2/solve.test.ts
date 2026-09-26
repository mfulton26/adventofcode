import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "R8, R4, R4, R8", expected: 4 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
