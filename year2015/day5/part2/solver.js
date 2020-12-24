const isNiceRegExp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/gm;

export function solve(input) {
  return count(input.matchAll(isNiceRegExp));
}

function count(iterable) {
  let count = 0;
  for (const _ of iterable) {
    count++;
  }
  return count;
}
