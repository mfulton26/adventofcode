import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: ">", expected: 2 },
  { input: "^>v<", expected: 4 },
  { input: "^v^v^v^v^v", expected: 2 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
