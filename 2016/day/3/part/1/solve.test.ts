import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
101 301 501
102 302 502
103 303 503
201 401 601
202 402 602
203 403 603`;

  assertEquals(solve(input), 3);
});
