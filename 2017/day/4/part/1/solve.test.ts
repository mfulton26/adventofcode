import { isValid } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "aa bb cc dd ee", expected: true },
  { input: "aa bb cc dd aa", expected: false },
  { input: "aa bb cc dd aaa", expected: true },
])("isValid $input", ({ input, expected }) => {
  assertEquals(isValid(input), expected);
});
