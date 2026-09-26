import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "1", expected: 0 },
  { input: "12", expected: 3 },
  { input: "23", expected: 2 },
  { input: "1024", expected: 31 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
