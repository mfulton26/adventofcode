export function parseNumbers(text: string) {
  const numbers = text.split("\n").map((line) => line.split(/ +/).map(Number));
  const left = numbers.map(([left]) => left);
  const right = numbers.map(([, right]) => right);
  return { left, right };
}
