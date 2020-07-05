import { compareNumbers } from "./comparer.js";

/**
 * @param {number[]} numbers
 * @returns {number[]}
 */
export function sortNumbers(numbers) {
  return numbers.sort(compareNumbers);
}
