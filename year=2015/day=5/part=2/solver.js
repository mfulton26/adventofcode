const isNiceRegExp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/gm;

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  return input.match(isNiceRegExp)?.length ?? 0;
}
