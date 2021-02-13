export function solve(input, { preambleLength = 25 } = {}) {
  const numbers = input.split("\n").map(Number);
  const [invalidNumber] = findInvalidNumbers(numbers, { preambleLength });
  return invalidNumber;
}

function* findInvalidNumbers(numbers, { preambleLength }) {
  for (let i = preambleLength; i < numbers.length; i++) {
    const number = numbers[i];
    if (!isValid(number, numbers.slice(i - preambleLength, i))) {
      yield number;
    }
  }
}

function isValid(number, numbers) {
  const set = new Set(numbers);
  for (const a of set) {
    const b = number - a;
    if (set.has(b)) {
      return true;
    }
  }
  return false;
}
