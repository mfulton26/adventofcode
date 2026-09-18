import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "ihgpwlah", expected: "DDRRRD" },
  { input: "kglvqrro", expected: "DDUDRLRRUDRD" },
  { input: "ulqzkmiv", expected: "DRURDRUDDLLDLUURRDULRLDUUDDDRR" },
])("$input", ({ input, expected }) => {
  assertEquals(solve(input), expected);
});
