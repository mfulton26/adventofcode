import { alphanumericalCompareFn } from "@lib/alphanumeric.ts";

import { assertEquals } from "@std/assert";

Deno.test.each([
  { category: "alphabetical", a: "abc", b: "abc", expected: 0 },
  { category: "alphabetical", a: "abc", b: "cba", expected: -1 },
  { category: "alphabetical", a: "cba", b: "abc", expected: 1 },
  { category: "numerical", a: "0", b: "0", expected: 0 },
  { category: "numerical", a: "1", b: "1", expected: 0 },
  { category: "numerical", a: "1", b: "10", expected: -1 },
  { category: "numerical", a: "10", b: "1", expected: 1 },
  { category: "numerical", a: "1", b: "11", expected: -1 },
  { category: "numerical", a: "11", b: "1", expected: 1 },
  { category: "numerical", a: "2", b: "10", expected: -1 },
  { category: "numerical", a: "10", b: "2", expected: 1 },
  { category: "alphanumerical", a: "abc123", b: "abc123", expected: 0 },
  { category: "alphanumerical", a: "abc123", b: "123abc", expected: -1 },
  { category: "alphanumerical", a: "123abc", b: "abc123", expected: 1 },
  { category: "alphanumerical", a: "a1b2c3", b: "a1b2c3", expected: 0 },
  { category: "alphanumerical", a: "a2", b: "a10", expected: -1 },
  { category: "alphanumerical", a: "a10", b: "a2", expected: 1 },
  { category: "alphanumerical", a: "1ab", b: "1ba", expected: -1 },
  { category: "alphanumerical", a: "1ba", b: "1ab", expected: 1 },
])('$category: "$a" vs. "$b"', ({ a, b, expected }) => {
  assertEquals(alphanumericalCompareFn(a, b), expected);
});
