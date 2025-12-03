export default function solve(input: string) {
  const banks = input.split("\n").map((line) => Array.from(line, Number));
  let sum = 0;
  for (const bank of banks) {
    const max = Math.max(...bank.slice(0, -1));
    const indexOfMax = bank.findIndex((value) => value === max);
    sum += max * 10 + Math.max(...bank.slice(indexOfMax + 1));
  }
  return sum;
}
