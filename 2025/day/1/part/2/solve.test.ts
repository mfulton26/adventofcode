import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

  assertEquals(solve(input), 6);
});
