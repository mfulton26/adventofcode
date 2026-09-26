import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "abcdef", expected: 609043 },
  { input: "pqrstuv", expected: 1048970 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
