import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

const input = `16,1,2,0,4,2,7,1,2,14`;

Deno.test("example", () => {
  assertEquals(solve(input), 168);
});
