import { isValidPassword } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "hijklmmn", expected: false },
  { input: "abbceffg", expected: false },
  { input: "abbcegjk", expected: false },
])("isValidPassword $input", ({ input, expected }) => {
  assertEquals(isValidPassword(input), expected);
});
