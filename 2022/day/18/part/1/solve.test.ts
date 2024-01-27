import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("mini example", () => {
  assertEquals(solve(`1,1,1\n2,1,1`), 10);
});

Deno.test("example", () => {
  const input = `\
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

  assertEquals(solve(input), 64);
});
