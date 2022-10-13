import { alphanumericalCompareFn } from "./alphanumeric.ts";

import { assertEquals } from "../lib/testing/asserts.ts";

Deno.test("alphanumericalCompareFn", async (t) => {
  await t.step("alphabetical", async (t) => {
    await t.step('"abc" vs. "abc"', expect(0));
    await t.step('"abc" vs. "cba"', expect(-1));
    await t.step('"cba" vs. "abc"', expect(1));
  });

  await t.step("numerical", async (t) => {
    await t.step('"0" vs. "0"', expect(0));
    await t.step('"1" vs. "1"', expect(0));
    await t.step('"1" vs. "10"', expect(-1));
    await t.step('"10" vs. "1"', expect(1));
    await t.step('"1" vs. "11"', expect(-1));
    await t.step('"11" vs. "1"', expect(1));
    await t.step('"2" vs. "10"', expect(-1));
    await t.step('"10" vs. "2"', expect(1));
  });

  await t.step("alphanumerical", async (t) => {
    await t.step('"abc123" vs. "abc123"', expect(0));
    await t.step('"abc123" vs. "123abc"', expect(-1));
    await t.step('"123abc" vs. "abc123"', expect(1));
    await t.step('"a1b2c3" vs. "a1b2c3"', expect(0));
    await t.step('"a2" vs. "a10"', expect(-1));
    await t.step('"a10" vs. "a2"', expect(1));
    await t.step('"1ab" vs. "1ba"', expect(-1));
    await t.step('"1ba" vs. "1ab"', expect(1));
  });

  function expect(expected: unknown) {
    return (t: Deno.TestContext) => {
      const [a, b] = JSON.parse(`[${t.name.replace(" vs. ", ", ")}]`);
      assertEquals(alphanumericalCompareFn(a, b), expected);
    };
  }
});
