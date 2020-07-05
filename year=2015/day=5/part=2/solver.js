const isNiceRegExp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/;

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  let count = 0;
  for (const string of input.split("\n")) {
    if (isNiceRegExp.test(string)) {
      count++;
    }
  }
  return count;
}
