import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`;

  assertEquals(solve(input), 3);
});
