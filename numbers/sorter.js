import { compare } from "./comparer.js";

/**
 * @param {number[]} numbers
 * @returns {number[]}
 */
export function sort(numbers) {
  return numbers.sort(compare);
}
