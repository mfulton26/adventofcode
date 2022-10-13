const regexp = /^(?=.*(.).\1.*)(?=.*(..).*\2).*$/gm;

export default function solve(input: string) {
  let count = 0;
  for (const _ of input.matchAll(regexp)) count++;
  return count;
}
