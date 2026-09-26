import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "0222112222120000", expected: "01\n10" },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input, { size: { width: 2, height: 2 } }), expected);
});
