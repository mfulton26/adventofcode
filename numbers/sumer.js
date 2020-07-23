/**
 * @param {Iterable<number>} numbers
 * @returns {number}
 */
export function sum(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}
