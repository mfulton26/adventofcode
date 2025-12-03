import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
987654321111111
811111111111119
234234234234278
818181911112111`;

  assertEquals(solve(input), 357);
});
