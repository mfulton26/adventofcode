export function solve(input) {
  const digits = Array.from(input, Number);
  const offset = digits.length / 2;
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const nextDigit = digits[(i + offset) % digits.length];
    if (digit === nextDigit) {
      sum += digit;
    }
  }
  return sum;
}
