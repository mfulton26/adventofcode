import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "111111-111111", expected: 1 },
  { input: "223450-223450", expected: 0 },
  { input: "123789-123789", expected: 0 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
