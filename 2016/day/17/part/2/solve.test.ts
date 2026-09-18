import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "ihgpwlah", expected: 370 },
  { input: "kglvqrro", expected: 492 },
  { input: "ulqzkmiv", expected: 830 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
