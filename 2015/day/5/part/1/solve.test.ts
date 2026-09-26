import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "ugknbfddgicrmopn", expected: 1 },
  { input: "aaa", expected: 1 },
  { input: "jchzalrnumimnmhp", expected: 0 },
  { input: "haegwjzuvuyypxyu", expected: 0 },
  { input: "dvszwmarrgswjxmb", expected: 0 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
