import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
199
200
208
210
200
207
240
269
260
263`;

  assertEquals(solve(input), 7);
});
