import { isValid } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "abcde fghij", expected: true },
  { input: "abcde xyz ecdab", expected: false },
  { input: "a ab abc abd abf abj", expected: true },
  { input: "iiii oiii ooii oooi oooo", expected: true },
  { input: "oiii ioii iioi iiio", expected: false },
])("isValid $input", ({ input, expected }) => {
  assertEquals(isValid(input), expected);
});
