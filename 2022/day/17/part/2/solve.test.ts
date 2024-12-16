import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

  assertEquals(solve(input), 1514285714288);
});
