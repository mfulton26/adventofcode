import solve from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  assertEquals(solve("abc"), "18f47a30");
});
