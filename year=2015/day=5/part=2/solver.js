const isNiceRegExp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/;

export function solve(/** @type {string} */ input) {
  let count = 0;
  for (const string of input.split("\n")) {
    if (isNiceRegExp.test(string)) {
      count++;
    }
  }
  return count;
}
