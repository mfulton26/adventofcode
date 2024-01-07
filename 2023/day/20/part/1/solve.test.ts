import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example 1", () => {
  const input = `\
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

  assertEquals(solve(input), 32000000);
});

Deno.test("example 2", () => {
  const input = `\
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

  assertEquals(solve(input), 11687500);
});
