import { assertEquals } from "@std/assert/equals";
import { parse, stringify } from "./snafu.ts";

Deno.test.each([
  { value: 1, expected: "1" },
  { value: 2, expected: "2" },
  { value: 3, expected: "1=" },
  { value: 4, expected: "1-" },
  { value: 5, expected: "10" },
  { value: 6, expected: "11" },
  { value: 7, expected: "12" },
  { value: 8, expected: "2=" },
  { value: 9, expected: "2-" },
  { value: 10, expected: "20" },
  { value: 15, expected: "1=0" },
  { value: 20, expected: "1-0" },
  { value: 2022, expected: "1=11-2" },
  { value: 12345, expected: "1-0---0" },
  { value: 314159265, expected: "1121-1110-1=0" },
])("toSnafu $value", ({ value, expected }) => {
  assertEquals(stringify(value), expected);
});

Deno.test.each([
  { input: "1=-0-2", expected: 1747 },
  { input: "12111", expected: 906 },
  { input: "2=0=", expected: 198 },
  { input: "21", expected: 11 },
  { input: "2=01", expected: 201 },
  { input: "111", expected: 31 },
  { input: "20012", expected: 1257 },
  { input: "112", expected: 32 },
  { input: "1=-1=", expected: 353 },
  { input: "1-12", expected: 107 },
  { input: "12", expected: 7 },
  { input: "1=", expected: 3 },
  { input: "122", expected: 37 },
])("toDecimal $input", ({ input, expected }) => {
  assertEquals(parse(input), expected);
});
