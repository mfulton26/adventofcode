const regExp = /^(?<lower>\d+)-(?<upper>\d+) (?<letter>.): (?<password>.*)$/gm;

export default function solve(input: string) {
  let count = 0;
  for (const { groups } of input.matchAll(regExp)) {
    const lower = Number(groups!.lower);
    const upper = Number(groups!.upper);
    const occurrences =
      groups!.password.match(new RegExp(groups!.letter, "g"))?.length ?? 0;
    if (occurrences < lower || occurrences > upper) continue;
    count++;
  }
  return count;
}
