import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  const input = `\
cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a
`;

  assertEquals(solve(input), 42);
});
