import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "1122", expected: 3 },
  { input: "1111", expected: 4 },
  { input: "1234", expected: 0 },
  { input: "91212129", expected: 9 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
