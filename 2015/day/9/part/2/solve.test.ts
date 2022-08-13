import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

  assertEquals(solve(input), 982);
});
