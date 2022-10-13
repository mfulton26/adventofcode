import { createSignals, parseInstructions } from "./solve.ts";

import { assertEquals } from "../../../../../lib/testing/asserts.ts";

Deno.test("example", () => {
  const input = `\
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

  const instructions = parseInstructions(input);
  const signals = createSignals(instructions);
  const actual = Object.fromEntries(
    Array.from(instructions.keys())
      .sort()
      .map((key) => [key, signals.get(key)]),
  );
  const expected = {
    "d": 72,
    "e": 507,
    "f": 492,
    "g": 114,
    "h": 65412,
    "i": 65079,
    "x": 123,
    "y": 456,
  };

  assertEquals(actual, expected);
});
