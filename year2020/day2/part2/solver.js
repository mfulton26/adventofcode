export function solve(input) {
  let count = 0;
  for (let {
    groups: { lower, upper, letter, password },
  } of input.matchAll(
    /^(?<lower>\d+)-(?<upper>\d+) (?<letter>.): (?<password>.*)$/gm
  )) {
    lower = password.charAt(Number(lower) - 1);
    upper = password.charAt(Number(upper) - 1);
    if (lower !== upper && (lower === letter || upper === letter)) {
      count++;
    }
  }
  return count;
}
