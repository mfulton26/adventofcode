import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "1212", expected: 6 },
  { input: "1221", expected: 0 },
  { input: "123425", expected: 4 },
  { input: "123123", expected: 12 },
  { input: "12131415", expected: 4 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
