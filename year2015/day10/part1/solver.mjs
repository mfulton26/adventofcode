export function solve(input, { times = 40 } = {}) {
  let sequence = input;
  for (let n = 1; n <= times; n++) {
    sequence = lookAndSay(sequence);
  }
  return sequence.length;
}

export function lookAndSay(sequence) {
  return sequence.replace(/(\d)\1*/g, (s) => `${s.length}${s[0]}`);
}
