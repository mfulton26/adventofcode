import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

  assertEquals(solve(input), 2);
});
