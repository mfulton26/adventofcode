import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { input: "..^^.", rows: 3, expected: 6 },
  { input: ".^^.^.^^^^", rows: 10, expected: 38 },
])("$input", ({ input, rows, expected }) => {
  assertEquals(solve(input, { rows }), expected);
});
