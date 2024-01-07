import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  assertEquals(solve(input), 24000);
});
