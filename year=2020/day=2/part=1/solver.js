export function solve(input) {
  let count = 0;
  for (let {
    groups: { lower, upper, letter, password },
  } of input.matchAll(
    /^(?<lower>\d+)-(?<upper>\d+) (?<letter>.): (?<password>.*)$/gm
  )) {
    lower = Number(lower);
    upper = Number(upper);
    const occurrences = password.match(new RegExp(letter, "g"))?.length ?? 0;
    if (occurrences >= lower && occurrences <= upper) {
      count++;
    }
  }
  return count;
}
