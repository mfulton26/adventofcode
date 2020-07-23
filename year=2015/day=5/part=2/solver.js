const isNiceRegExp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/gm;

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let count = 0;
  for (const _ of input.matchAll(isNiceRegExp)) {
    count++;
  }
  return count;
}
