import solve from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  assertEquals(solve("abc"), "05ace8e3");
});
