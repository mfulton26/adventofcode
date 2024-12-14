import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
30373
25512
65332
33549
35390`;

  assertEquals(solve(input), 8);
});
