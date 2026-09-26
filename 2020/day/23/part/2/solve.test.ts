import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "389125467", expected: 149245887792 },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
