import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

  assertEquals(solve(input), 13);
});
