import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "112233-112233", expected: 1 },
  { input: "123444-123444", expected: 0 },
  { input: "111122-111122", expected: 1 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
