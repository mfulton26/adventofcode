export default function solve(input: string) {
  const banks = input.split("\n").map((line) => Array.from(line, Number));
  let sum = 0;
  for (let bank of banks) {
    const digits = [Math.max(...bank.slice(0, -11))];
    while (digits.length < 12) {
      bank = bank.slice(bank.indexOf(digits[digits.length - 1]) + 1);
      digits.push(Math.max(...bank.slice(0, bank.length - 11 + digits.length)));
    }
    sum += +digits.join("");
  }
  return sum;
}
