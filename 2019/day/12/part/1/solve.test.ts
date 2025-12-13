import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("first example", () => {
  const input = `\
<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

  assertEquals(solve(input, { steps: 10 }), 179);
});

Deno.test("second example", () => {
  const input = `\
<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

  assertEquals(solve(input, { steps: 100 }), 1940);
});
