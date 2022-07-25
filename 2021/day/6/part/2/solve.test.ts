import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

const input = `3,4,3,1,2`;

Deno.test("example", () => {
  assertEquals(solve(input), 26984457539);
});
