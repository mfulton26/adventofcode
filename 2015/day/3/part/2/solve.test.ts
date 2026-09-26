import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "^v", expected: 3 },
  { input: "^>v<", expected: 3 },
  { input: "^v^v^v^v^v", expected: 11 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
