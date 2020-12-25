const isNiceRegExp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/gm;

export function solve(input) {
  return Array.from(input.matchAll(isNiceRegExp)).length;
}
