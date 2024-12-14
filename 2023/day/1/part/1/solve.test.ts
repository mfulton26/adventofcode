import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  assertEquals(solve(input), 142);
});
