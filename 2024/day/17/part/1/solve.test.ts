import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

  assertEquals(solve(input), "4,6,3,5,6,3,5,2,1,0");
});
