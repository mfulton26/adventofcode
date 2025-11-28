import { paintPanels } from "./solve.ts";

import { assertEquals } from "@std/assert";

Deno.test("example", () => {
  assertEquals(
    paintPanels(function* instructions() {
      yield* [1, 0];
      yield* [0, 0];
      yield* [1, 0];
      yield* [1, 0];
      yield* [0, 1];
      yield* [1, 0];
      yield* [1, 0];
    }).size,
    6,
  );
});
