import { assertEquals } from "@std/assert";

import { createProgram } from "./intcode.ts";

Deno.test("createProgram handles quine-style output", () => {
  const memory = [
    109,
    1,
    204,
    -1,
    1001,
    100,
    1,
    100,
    1008,
    100,
    16,
    101,
    1006,
    101,
    0,
    99,
  ];
  const expected = [...memory];

  assertEquals(createProgram(memory)([]).toArray(), expected);
});

Deno.test("program supports relative mode output", () => {
  const memory = [104, 1125899906842624, 99];

  assertEquals(createProgram(memory)([]).toArray(), [1125899906842624]);
});
