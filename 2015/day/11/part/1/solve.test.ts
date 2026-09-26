import solve, { isValidPassword } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "hijklmmn", expected: false },
  { input: "abbceffg", expected: false },
  { input: "abbcegjk", expected: false },
])("isValidPassword $input", ({ input, expected }) => {
  assertEquals(isValidPassword(input), expected);
});

Deno.test.each([
  { input: "abcdefgh", expected: "abcdffaa" },
  { input: "ghijklmn", expected: "ghjaabcc" },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
