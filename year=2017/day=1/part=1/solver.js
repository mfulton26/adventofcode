export function solve(input) {
  const digits = Array.from(input, Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const nextDigit = digits[(i + 1) % digits.length];
    if (digit === nextDigit) {
      sum += digit;
    }
  }
  return sum;
}
