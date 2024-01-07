import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example 1", () => {
  const input = `\
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

  assertEquals(solve(input), 1);
});

Deno.test("example 2", () => {
  const input = `\
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

  assertEquals(solve(input), 36);
});
