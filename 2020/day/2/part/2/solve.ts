const regExp = /^(?<lower>\d+)-(?<upper>\d+) (?<letter>.): (?<password>.*)$/gm;

export default function solve(input: string) {
  let count = 0;
  for (const { groups } of input.matchAll(regExp)) {
    const lower = groups!.password.charAt(Number(groups!.lower) - 1);
    const upper = groups!.password.charAt(Number(groups!.upper) - 1);
    if (lower === upper) continue;
    if (lower !== groups!.letter && upper !== groups!.letter) continue;
    count++;
  }
  return count;
}
