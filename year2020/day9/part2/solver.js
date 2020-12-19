export function solve(input, { preambleLength = 25 } = {}) {
  const numbers = input.split("\n").map(Number);
  return findEncryptionWeakness(numbers, { preambleLength });
}

function findEncryptionWeakness(numbers, { preambleLength }) {
  const [invalidNumber] = findInvalidNumbers(numbers, { preambleLength });
  const [contiguousNumbers] = findContiguousNumberArrays(numbers, {
    sum: invalidNumber,
  });
  return Math.min(...contiguousNumbers) + Math.max(...contiguousNumbers);
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

function* findContiguousNumberArrays(numbers, { sum: target }) {
  for (let i = 0, j = 2; j < numbers.length; ) {
    if (j - i < 2) {
      j++;
      continue;
    }
    const contiguousNumbers = numbers.slice(i, j);
    const sum = contiguousNumbers.reduce((sum, value) => sum + value, 0);
    if (sum > target) {
      i++;
    } else if (sum < target) {
      j++;
    } else {
      yield contiguousNumbers;
    }
  }
}
