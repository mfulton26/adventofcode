import { alphanumericalCompareFn } from "./aoc.ts";

import { assertEquals } from "std/testing/asserts.ts";

Deno.test("alphabetical", async (t) => {
  await t.step('["abc", "abc", 0]', fn);
  await t.step('["abc", "cba", -1]', fn);
  await t.step('["cba", "abc", 1]', fn);
});

Deno.test("numerical", async (t) => {
  await t.step('["0", "0", 0]', fn);
  await t.step('["1", "1", 0]', fn);
  await t.step('["1", "10", -1]', fn);
  await t.step('["10", "1", 1]', fn);
  await t.step('["1", "11", -1]', fn);
  await t.step('["11", "1", 1]', fn);
  await t.step('["2", "10", -1]', fn);
  await t.step('["10", "2", 1]', fn);
});

Deno.test("alphanumerical", async (t) => {
  await t.step('["abc123", "abc123", 0]', fn);
  await t.step('["abc123", "123abc", -1]', fn);
  await t.step('["123abc", "abc123", 1]', fn);
  await t.step('["a1b2c3", "a1b2c3", 0]', fn);
  await t.step('["a2", "a10", -1]', fn);
  await t.step('["a10", "a2", 1]', fn);
  await t.step('["1ab", "1ba", -1]', fn);
  await t.step('["1ba", "1ab", 1]', fn);
});

function fn(t: Deno.TestContext) {
  const [a, b, expected] = JSON.parse(t.name);
  assertEquals(alphanumericalCompareFn(a, b), expected);
}
