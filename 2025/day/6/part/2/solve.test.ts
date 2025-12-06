import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

  assertEquals(solve(input), 3263827);
});
