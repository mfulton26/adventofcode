import { exec } from "./solve.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
inc a
jio a, +2
tpl a
inc a`;

  assertEquals(exec(input), { a: 2, b: 0 });
});
