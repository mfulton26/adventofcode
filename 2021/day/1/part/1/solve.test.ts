import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

const input = `199
200
208
210
200
207
240
269
260
263`;

Deno.test("example", () => {
  assertEquals(solve(input), 7);
});
