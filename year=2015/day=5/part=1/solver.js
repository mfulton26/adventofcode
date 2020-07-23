const isNiceRegExp = /^(?=(?:.*[aeiou].*){3,})(?=.*(.)\1)(?!.*(?:ab|cd|pq|xy).*).*$/gm;

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  return input.match(isNiceRegExp)?.length ?? 0;
}
