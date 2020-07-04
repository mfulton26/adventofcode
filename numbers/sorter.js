import { compareNumbers } from "./comparer.js";

export function sortNumbers(/** @type {number[]} */ numbers) {
  return numbers.sort(compareNumbers);
}
