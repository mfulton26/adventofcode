import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

  assertEquals(solve(input), "117440");
});
