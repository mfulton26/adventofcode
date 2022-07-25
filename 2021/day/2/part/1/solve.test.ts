import solve from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

Deno.test("example", () => {
  assertEquals(solve(input), 150);
});
