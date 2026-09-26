import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "389125467", expected: "67384529" },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
