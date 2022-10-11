import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
abcdef
babab
abbcde
abcccd
aabcd
abcde
ababa`;

  assertEquals(solve(input), 12);
});
