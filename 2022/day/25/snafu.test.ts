import { assertEquals } from "@std/assert/equals";
import { parse, stringify } from "./snafu.ts";

Deno.test("toSnafu", async (t) => {
  function expect(expected: string) {
    return (t: Deno.TestContext) => {
      assertEquals(stringify(Number(t.name)), expected);
    };
  }

  await t.step("1", expect("1"));
  await t.step("2", expect("2"));
  await t.step("3", expect("1="));
  await t.step("4", expect("1-"));
  await t.step("5", expect("10"));
  await t.step("6", expect("11"));
  await t.step("7", expect("12"));
  await t.step("8", expect("2="));
  await t.step("9", expect("2-"));
  await t.step("10", expect("20"));
  await t.step("15", expect("1=0"));
  await t.step("20", expect("1-0"));
  await t.step("2022", expect("1=11-2"));
  await t.step("12345", expect("1-0---0"));
  await t.step("314159265", expect("1121-1110-1=0"));
});

Deno.test("toDecimal", async (t) => {
  function expect(expected: number) {
    return (t: Deno.TestContext) => {
      assertEquals(parse(t.name), expected);
    };
  }

  await t.step("1=-0-2", expect(1747));
  await t.step("12111", expect(906));
  await t.step("2=0=", expect(198));
  await t.step("21", expect(11));
  await t.step("2=01", expect(201));
  await t.step("111", expect(31));
  await t.step("20012", expect(1257));
  await t.step("112", expect(32));
  await t.step("1=-1=", expect(353));
  await t.step("1-12", expect(107));
  await t.step("12", expect(7));
  await t.step("1=", expect(3));
  await t.step("122", expect(37));
});
