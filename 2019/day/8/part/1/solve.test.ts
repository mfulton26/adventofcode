import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "123456789012", expected: 1 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input, { size: { width: 3, height: 2 } }), expected);
});
