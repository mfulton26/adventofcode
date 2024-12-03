import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

  assertEquals(solve(input), 161);
});
