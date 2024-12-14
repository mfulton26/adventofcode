import combinations from "@lib/combinations.ts";

import { assertEquals } from "@std/assert";

Deno.test("set.size === 3 && size === 2", () => {
  assertEquals(
    [...combinations(new Set([1, 2, 3]), 2)],
    [new Set([1, 2]), new Set([1, 3]), new Set([2, 3])],
  );
});

Deno.test("set.size === 10 && size === 2", () => {
  assertEquals(
    [...combinations(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 2)],
    [
      new Set([1, 2]),
      new Set([1, 3]),
      new Set([2, 3]),
      new Set([1, 4]),
      new Set([2, 4]),
      new Set([3, 4]),
      new Set([1, 5]),
      new Set([2, 5]),
      new Set([3, 5]),
      new Set([4, 5]),
      new Set([1, 6]),
      new Set([2, 6]),
      new Set([3, 6]),
      new Set([4, 6]),
      new Set([5, 6]),
      new Set([1, 7]),
      new Set([2, 7]),
      new Set([3, 7]),
      new Set([4, 7]),
      new Set([5, 7]),
      new Set([6, 7]),
      new Set([1, 8]),
      new Set([2, 8]),
      new Set([3, 8]),
      new Set([4, 8]),
      new Set([5, 8]),
      new Set([6, 8]),
      new Set([7, 8]),
      new Set([1, 9]),
      new Set([2, 9]),
      new Set([3, 9]),
      new Set([4, 9]),
      new Set([5, 9]),
      new Set([6, 9]),
      new Set([7, 9]),
      new Set([8, 9]),
      new Set([1, 10]),
      new Set([2, 10]),
      new Set([3, 10]),
      new Set([4, 10]),
      new Set([5, 10]),
      new Set([6, 10]),
      new Set([7, 10]),
      new Set([8, 10]),
      new Set([9, 10]),
    ],
  );
});

Deno.test("set.size === 10 && size === 10", () => {
  assertEquals(
    [...combinations(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 10)],
    [new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])],
  );
});

Deno.test("set.size === 11 && size === 10", () => {
  assertEquals(
    [...combinations(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), 10)],
    [
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11]),
      new Set([1, 2, 3, 4, 5, 6, 7, 8, 10, 11]),
      new Set([1, 2, 3, 4, 5, 6, 7, 9, 10, 11]),
      new Set([1, 2, 3, 4, 5, 6, 8, 9, 10, 11]),
      new Set([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]),
      new Set([1, 2, 3, 4, 6, 7, 8, 9, 10, 11]),
      new Set([1, 2, 3, 5, 6, 7, 8, 9, 10, 11]),
      new Set([1, 2, 4, 5, 6, 7, 8, 9, 10, 11]),
      new Set([1, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
      new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    ],
  );
});
