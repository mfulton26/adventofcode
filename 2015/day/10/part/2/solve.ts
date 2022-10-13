export default function solve(input: string) {
  let sequence = input;
  for (let n = 1; n <= 50; n++) {
    sequence = lookAndSay(sequence);
  }
  return sequence.length;
}

export function lookAndSay(sequence: string) {
  return sequence.replace(/(\d)\1*/g, (s) => `${s.length}${s[0]}`);
}
