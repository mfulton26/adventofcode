import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  {
    input: "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",
    expected: 145,
  },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
