import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  assertEquals(solve(input), 900);
});
