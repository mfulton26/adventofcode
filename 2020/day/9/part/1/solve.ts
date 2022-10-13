export default function solve(input: string, { preambleLength = 25 } = {}) {
  const numbers = input.split("\n").map(Number);
  const [invalidNumber] = findInvalidNumbers(numbers, preambleLength);
  return invalidNumber;
}

function* findInvalidNumbers(numbers: number[], preambleLength: number) {
  for (let i = preambleLength; i < numbers.length; i++) {
    const number = numbers[i];
    if (isValid(number, numbers.slice(i - preambleLength, i))) continue;
    yield number;
  }
}

function isValid(number: number, numbers: number[]) {
  const set = new Set(numbers);
  for (const a of set) {
    const b = number - a;
    if (set.has(b)) return true;
  }
  return false;
}
