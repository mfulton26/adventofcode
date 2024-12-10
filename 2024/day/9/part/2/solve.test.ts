import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = "2333133121414131402";

  assertEquals(solve(input), 2858);
});
