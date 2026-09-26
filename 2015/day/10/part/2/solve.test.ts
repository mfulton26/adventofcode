import { lookAndSay } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "1", expected: "11" },
  { input: "11", expected: "21" },
  { input: "21", expected: "1211" },
  { input: "1211", expected: "111221" },
  { input: "111221", expected: "312211" },
])("lookAndSay $input", ({ input, expected }) => {
  assertEquals(lookAndSay(input), expected);
});
